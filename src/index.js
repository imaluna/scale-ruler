import {
  isObject,
  toFixed,
  getGridSize,
  getOffset,
  setStyle,
  getTargetCoordinate,
  createDiv
} from './utils';
import deepmerge from 'deepmerge';

const defaultOpt = {
  // 画布缩放比例
  scale: 1,
  // 是否允许缩放
  canScale: true,
  // 最大缩放比例
  maxScale: 10,
  // 最小缩放比例
  minScale: 0.1,
  // 初始化是否自动居中
  autoCenter: true,
  // 初始化时是否自动计算画布缩放比例，此时忽略scale
  autoScale: true,
  // 是否自动计算容器的宽高，默认false，为true会监控container宽高变化并重新绘制
  containerAutoSize: false,
  // 容器宽度，containerAutoSize为true后，不取该值
  containerWidth: 1000,
  // 容器高度，containerAutoSize为true后，不取该值
  containerHeight: 500,
  containerXPadding: 800,
  containerYPadding: 800,
  canvasWidth: 1920,
  canvasHeight: 1000,
  // 是否代理放大和缩小快捷键 ctrl+ "+" 和 ctrl + "-"
  proxyScaleKey: true,
  // 是否展示滚动条
  useScrollBar: true,
  // 是否展示标尺
  useRuler: true,
  // 是否使用定位线
  usePositionLine: true,
  positionLineConfig: {
    lineColor: '#6CC6A7',
    padding: 3,
    adsorptionXList: [],
    adsorptionYList: [],
    // 吸附距离
    adsorptionGap: 4,
    zIndex: 300,
    useRemove: true,
    removeIcon: '',
    removeIconFillColor: '#525252'
  },
  // 画布的样式
  canvasStyle: {},
  // 滚动条配置
  scrollBarConfig: {
    backgroundColor: '#000000',
    opacity: 0.4,
    zIndex: 500,
    barSize: 8
  },
  // 标尺配置
  rulerConfig: {
    // 垂直标尺的宽度
    yRulerWidth: 20,
    // 水平标尺的高度
    xRulerHeight: 20,
    // 标尺背景色
    bgColor: '#f5f5f5',
    // 标尺数值的颜色
    fontColor: '#797B80',
    // 标尺数值的字体大小
    fontSize: 10,
    // 标尺数值的字体
    fontFamily: 'Arial',
    // 标尺刻度线的颜色
    lineColor: '#797B80',
    zIndex: 400
  },
  // 画布缩放回调
  onScale: () => {},
  // 画布移动回调
  onMove: () => {},
  adsorptionLineChange: () => {},
  positionLineChange: () => {}
};

Object.freeze(defaultOpt);

export default class ScaleRuler {
  constructor(options) {
    this._init(options);
  }
  _init(options) {
    if (!isObject(options)) {
      throw TypeError('options必须为对象');
    }
    const opt = deepmerge(defaultOpt, options);
    this._checkOptions(opt);
    opt.containerConfig = {};
    opt.canvasConfig = {};
    this.opt = opt;
    this._initContainer();
    this._setContainerAttribute();
    this._initCanvas();

    if (opt.proxyScaleKey) {
      document.addEventListener('keydown', this._keydownEvent.bind(this));
    }
    if (opt.useScrollBar) {
      opt.wheelTimer = null;
    }
  }
  // 检查参数
  _checkOptions(opt) {
    if (!opt.el) {
      throw Error('容器不能为空');
    }
    const containerEl =
      opt.el instanceof HTMLElement ? opt.el : document.querySelector(opt.el);
    if (!containerEl) {
      throw Error(opt.el + '容器不存在');
    }
    if (
      !document.body.contains(containerEl) &&
      !document.documentElement.contains(containerEl)
    ) {
      throw Error('页面上不存在该容器');
    }
    opt.containerEl = containerEl;
    const { minScale, maxScale } = opt;
    if (minScale <= 0) {
      throw Error('minScale必须大于0');
    }
    if (maxScale <= 0) {
      throw Error('maxScale必须大于0');
    }
    if (maxScale < minScale) {
      throw Error('minScale不能大于maxScale');
    }
  }
  // 代理快捷键缩放
  _keydownEvent(e) {
    if (this.opt.canScale) {
      const keyCode = e.keyCode;
      if ((e.metaKey || e.ctrlKey) && (keyCode === 187 || keyCode === 189)) {
        e.preventDefault();
        const newScale = this.opt.scale + (keyCode === 187 ? 0.05 : -0.05);
        this.changeScale(newScale);
      }
    }
  }
  // 获取移动边界
  _setTranslateBoundary(realWidth, realHeight) {
    const { opt } = this;
    const { width, height, containerXPadding, containerYPadding } = opt;

    const maxTranslateX = Math.max((width - realWidth) / 2, containerXPadding);
    const maxTranslateY = Math.max(
      (height - realHeight) / 2,
      containerYPadding
    );
    const minTranslateX =
      realWidth + 2 * containerXPadding > width
        ? width - (realWidth + containerXPadding)
        : maxTranslateX;
    const minTranslateY =
      realHeight + 2 * containerYPadding > height
        ? height - (realHeight + containerYPadding)
        : maxTranslateY;
    opt.canvasConfig.maxTranslateX = maxTranslateX;
    opt.canvasConfig.maxTranslateY = maxTranslateY;
    opt.canvasConfig.minTranslateX = minTranslateX;
    opt.canvasConfig.minTranslateY = minTranslateY;
  }
  // 初始化容器
  _initContainer(resize = false) {
    const { opt } = this;
    let width, height;
    if (opt.containerAutoSize) {
      width = parseFloat(opt.containerEl.offsetWidth);
      height = parseFloat(opt.containerEl.offsetHeight);
      // 缓存原宽高
      opt.containerConfig.originWidth = width;
      opt.containerConfig.originHeight = height;
      // 自动监听containerEl宽高变化
      if (!opt.addResize) {
        this._onContainerResize();
      }
    } else {
      width = opt.canvasWidth;
      height = opt.canvasHeight;
      opt.containerEl.style.width = width + 'px';
      opt.containerEl.style.height = height + 'px';
    }
    const styles = getComputedStyle(opt.containerEl);
    if (styles.boxSizing === 'border-box') {
      width -=
        parseFloat(styles.borderLeftWidth) +
        parseFloat(styles.borderRightWidth);
      height -=
        parseFloat(styles.borderTopWidth) +
        parseFloat(styles.borderBottomWidth);
    }
    opt.width = width;
    opt.height = height;
    if (styles.position === 'static') {
      opt.containerEl.style.position = 'relative';
    }
    opt.containerEl.style.overflow = 'hidden';
    if (opt.useRuler) {
      this._initRuler(resize);
    }
  }
  /**
   * 设置容器的类名和样式属性
   */
  _setContainerAttribute() {
    const { containerEl } = this.opt;
    const classList = [...containerEl.classList];
    classList.push('scale-ruler');
    containerEl.setAttribute('class', classList.join(' '));
    containerEl.style.backgroundColor = '#f5f5f5';
    containerEl.style.backgroundImage = `linear-gradient(#f5f5f5 14px, transparent 0),linear-gradient(90deg, transparent 14px, #373739 0)`;
    containerEl.style.backgroundSize = `15px 15px,15px 15px`;
  }
  // 监听容器变化
  _onContainerResize() {
    const { opt } = this;
    const { containerEl, containerConfig } = opt;
    containerConfig.addResize = true;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerEl) {
          const width = containerEl.offsetWidth;
          const height = containerEl.offsetHeight;
          if (
            width !== containerConfig.originWidth ||
            height !== containerConfig.originHeight
          ) {
            this._initContainer(true);
            this._initCanvas(true);
          }
        }
      }
    });
    resizeObserver.observe(containerEl);
  }
  _repaintRuler(isVertical) {
    const { opt } = this;
    const { rulerConfig, canvasConfig, scale } = opt;
    const ctx = isVertical ? opt.vCtx : opt.hCtx;
    const padding = isVertical
      ? rulerConfig.yRulerWidth
      : rulerConfig.xRulerHeight;
    const width = isVertical ? padding : opt.width;
    const height = isVertical ? opt.height : padding;
    ctx.clearRect(0, 0, width, height);
    const { translateX, translateY } = canvasConfig;
    const translate = isVertical ? translateY : translateX;
    ctx.save();
    ctx.fillStyle = rulerConfig.bgColor;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    const gridSize = getGridSize(scale);
    const gridPixel = gridSize * scale;
    const ratio = window.devicePixelRatio;
    const distance = -translate;
    const startValue = Math.floor(distance / gridPixel);
    const endValue = Math.floor(
      ((isVertical ? height : width) - translate) / gridPixel
    );
    ctx.save();
    ctx.fillStyle = rulerConfig.lineColor;
    ctx.translate(0.5, 0.5);
    ctx.scale(1 / ratio, 1 / ratio);
    if (isVertical) {
      ctx.rotate(Math.PI / 2);
      ctx.fillRect(0, -(padding - 1) * ratio, height * ratio, 1);
    } else {
      ctx.fillRect(0, (padding - 1) * ratio, width * ratio, 1);
    }
    for (let i = startValue; i <= endValue; i++) {
      ctx.fillStyle = rulerConfig.lineColor;
      const x = (translate + i * gridPixel) * ratio;
      let gap = padding / 4;
      if (i % 10 === 0) {
        gap = (padding * 4) / 5;
      } else if (i % 5 === 0) {
        gap = padding / 3;
      }
      if (isVertical) {
        ctx.fillRect(x, -padding * ratio, 1, gap * ratio);
      } else {
        ctx.fillRect(x, (padding - gap) * ratio, 1, gap * ratio);
      }
      if (i % 10 === 0) {
        const text = String(i * gridSize);
        ctx.font = `${rulerConfig.fontSize * ratio}px ${rulerConfig.fontFamily}`;
        ctx.fillStyle = rulerConfig.fontColor;

        if (isVertical) {
          ctx.fillText(text, x + 2 * ratio, -(padding - gap) * ratio);
        } else {
          ctx.fillText(text, x + 2 * ratio, (padding + 8 - gap) * ratio);
        }
      }
    }
    ctx.restore();
  }
  // 初始化标尺
  _initRuler() {
    const { opt } = this;
    const { rulerConfig } = opt;
    if (!opt.hRuler) {
      opt.hRuler = this._createRuler(false);
      opt.hCtx = opt.hRuler.getContext('2d');
    }
    if (!opt.vRuler) {
      opt.vRuler = this._createRuler(true);
      opt.vCtx = opt.vRuler.getContext('2d');
    }
    opt.hRuler.setAttribute('width', opt.width);
    opt.hRuler.setAttribute('height', rulerConfig.xRulerHeight);
    opt.vRuler.setAttribute('height', opt.height);
    opt.vRuler.setAttribute('width', rulerConfig.yRulerWidth);
  }
  // 创建标尺
  _createRuler(isVertical) {
    const { opt } = this;
    const ruler = document.createElement('canvas');
    ruler.style.position = 'absolute';
    ruler.style.left = 0;
    ruler.style.top = 0;
    const { zIndex } = opt.rulerConfig;
    ruler.style.zIndex = isVertical ? zIndex : zIndex + 1;
    opt.containerEl.appendChild(ruler);
    if (opt.usePositionLine) {
      this._initPositionLine(opt, isVertical, ruler);
    }
    return ruler;
  }
  // 初始化定位线
  _initPositionLine(opt, isVertical, ruler) {
    const { positionLineConfig, rulerConfig } = opt;
    positionLineConfig.id = positionLineConfig.id || 0;
    positionLineConfig.lines = positionLineConfig.lines || {};
    const { lineColor, padding } = positionLineConfig;
    let positionLineWrapEl = positionLineConfig.positionLineWrapEl;
    if (!positionLineWrapEl) {
      positionLineWrapEl = createDiv();
      positionLineConfig.positionLineWrapEl = positionLineWrapEl;
      opt.containerEl.appendChild(positionLineWrapEl);
    }
    const offset = getOffset(ruler);
    const self = this;
    function rulerMouseMoveEvent(e) {
      if (!rulerConfig.isMouseDown) return;
      e.preventDefault();
      const targetCoordinate = getTargetCoordinate(e);
      const nodeInfo = positionLineConfig.currentNodeInfo;
      if (!nodeInfo) return;
      const { positionEl, dir, tipEl } = nodeInfo;
      const isY = dir === 'y';
      let translate = 0;
      if (isY) {
        positionEl.style.visibility =
          targetCoordinate.pageY > offset.top + rulerConfig.xRulerHeight
            ? 'visible'
            : 'hidden';
        translate = targetCoordinate.pageY - offset.top;
      } else {
        positionEl.style.visibility =
          targetCoordinate.pageX > offset.left + rulerConfig.yRulerWidth
            ? 'visible'
            : 'hidden';
        translate = targetCoordinate.pageX - offset.left;
      }
      const coordinate = self._translateToCoordinate(opt, isY, translate);
      // 检查吸附线
      const info = self._checkAdSorptionLine(coordinate, isY, translate);
      self._setLineTranslate(isY, info.translate, positionEl);
      self._checkTipPosition(info.translate, dir, positionEl, tipEl);
      nodeInfo.translate = info.translate;
      nodeInfo.coordinate = info.coordinate;
      tipEl.innerHTML = `${dir.toUpperCase()}: ${toFixed(info.coordinate)} px`;
    }
    ruler.addEventListener('mousedown', () => {
      rulerConfig.isMouseDown = true;
      const positionEl = createDiv();
      const positionElStyle = {
        position: 'absolute',
        visibility: 'hidden',
        backgroundColor: 'transparent',
        zIndex: positionLineConfig.zIndex
      };
      const lineEl = createDiv();
      const lineElStyle = {
        position: 'absolute',
        backgroundColor: lineColor
      };
      const tipEl = createDiv();
      const tipElStyle = {
        position: 'absolute',
        padding: '5px',
        lineHeight: '18px',
        minWidth: '80px',
        backgroundColor: 'rgba(0,0,0,.8)',
        color: '#fff',
        fontSize: '12px',
        borderRadius: '4px',
        userSelect: 'none',
        textAlign: 'center'
      };
      let dir = 'y';
      const positionSize = 2 * padding + 1;
      if (isVertical) {
        Object.assign(positionElStyle, {
          width: positionSize + 'px',
          height: opt.height + 'px',
          cursor: 'col-resize',
          top: 0,
          left: -padding + 'px'
        });

        Object.assign(lineElStyle, {
          top: 0,
          height: '100%',
          width: '1px',
          left: padding + 'px'
        });
        Object.assign(tipElStyle, {
          top: '50%',
          left: positionSize + 'px',
          transform: `translate(0, -50%)`
        });
        // 水平方向定位线
        dir = 'x';
      } else {
        Object.assign(positionElStyle, {
          height: positionSize + 'px',
          width: opt.width + 'px',
          cursor: 'row-resize',
          left: 0,
          top: -padding + 'px'
        });

        Object.assign(lineElStyle, {
          left: 0,
          width: '100%',
          height: '1px',
          top: padding + 'px'
        });
        Object.assign(tipElStyle, {
          left: '50%',
          top: positionSize + 'px',
          transform: `translate(-50%, 0)`
        });
      }
      setStyle(positionEl, positionElStyle);
      setStyle(lineEl, lineElStyle);
      setStyle(tipEl, tipElStyle);

      positionEl.setAttribute('data-id', positionLineConfig.id);

      positionEl.appendChild(lineEl);
      positionEl.appendChild(tipEl);
      positionLineWrapEl.appendChild(positionEl);
      const nodeInfo = {
        positionEl,
        id: positionLineConfig.id,
        tipEl,
        translate: 0,
        dir
      };
      positionLineConfig.lines[positionLineConfig.id++] = nodeInfo;
      positionLineConfig.currentNodeInfo = nodeInfo;
      document.addEventListener('mousemove', rulerMouseMoveEvent);
    });
    document.addEventListener('mouseup', (e) => {
      if (!rulerConfig.isMouseDown) return;
      rulerConfig.isMouseDown = false;
      const targetCoordinate = getTargetCoordinate(e);

      const nodeInfo = positionLineConfig.currentNodeInfo;
      if (nodeInfo) {
        const { positionEl, dir, id } = nodeInfo;
        const isY = dir === 'y';
        if (
          (!isY &&
            targetCoordinate.pageX <= offset.left + rulerConfig.yRulerWidth) ||
          (isY &&
            targetCoordinate.pageY <= offset.top + rulerConfig.xRulerHeight)
        ) {
          positionLineWrapEl.removeChild(positionEl);
          delete positionLineConfig.lines[id];
        } else {
          // 重新吸附
          const checkInfo = self._checkAdSorptionLine(
            nodeInfo.coordinate,
            isY,
            nodeInfo.translate
          );
          nodeInfo.translate = checkInfo.translate;
          nodeInfo.coordinate = checkInfo.coordinate;
          self._setLineTranslate(isY, nodeInfo.translate, positionEl);
          // positionEl事件监听
          self._addPositionLineEvent(nodeInfo, offset, isY);
          self._positionLineChange(isY);
        }
      }
      positionLineConfig.currentNodeInfo = null;
      document.removeEventListener('mousemove', rulerMouseMoveEvent);
    });
  }
  /**
   * 检查吸附线
   */
  _checkAdSorptionLine(coordinate, isY, translate) {
    const { adsorptionXList, adsorptionYList, adsorptionGap } =
      this.opt.positionLineConfig;
    const list = isY ? adsorptionYList : adsorptionXList;
    const res = { coordinate, translate };
    const len = list.length;
    const gap = Math.max(adsorptionGap, adsorptionGap / this.opt.scale);
    if (len > 0) {
      let start = 0;
      while (start < len) {
        const value = list[start];
        if (Math.abs(coordinate - value) <= gap) {
          // 可以吸附
          res.coordinate = value;
          res.translate = this._coordinateToTranslate(value, isY);
          break;
        } else {
          if (value > coordinate) {
            break;
          }
        }
        start++;
      }
    }
    return res;
  }
  /**
   * 定位线增加事件监听
   */
  _addPositionLineEvent(nodeInfo, offset, isY) {
    const { positionEl, tipEl } = nodeInfo;
    const { positionLineConfig, rulerConfig } = this.opt;
    const self = this;
    positionEl.addEventListener('mouseenter', () => {
      tipEl.style.display = 'block';
    });
    positionEl.addEventListener('mouseleave', () => {
      tipEl.style.display = 'none';
    });
    positionEl.addEventListener('mousedown', (e) => {
      e.preventDefault();
      positionLineConfig.isMouseDown = true;
      const targetCoordinate = getTargetCoordinate(e);
      nodeInfo.start = isY ? targetCoordinate.pageY : targetCoordinate.pageX;
      nodeInfo.originTranslate = nodeInfo.translate;
      nodeInfo.tipEl.style.display = 'block';
      positionLineConfig.currentNodeInfo = nodeInfo;
      document.addEventListener('mousemove', positionLineMoveEvent);
    });
    function positionLineMoveEvent(e) {
      if (!positionLineConfig.isMouseDown) return;
      e.preventDefault();
      const nodeInfo = positionLineConfig.currentNodeInfo;
      const targetCoordinate = getTargetCoordinate(e);

      const { dir, tipEl, start, originTranslate = 0, positionEl } = nodeInfo;
      const move =
        (isY ? targetCoordinate.pageY : targetCoordinate.pageX) - start;
      const translate = originTranslate + move;
      // 更新坐标数据
      const coordinate = self._translateToCoordinate(self.opt, isY, translate);
      // 检查吸附线
      const info = self._checkAdSorptionLine(coordinate, isY, translate);
      self._setLineTranslate(isY, info.translate, positionEl);
      self._checkTipPosition(info.translate, dir, positionEl, tipEl);
      nodeInfo.translate = info.translate;
      nodeInfo.coordinate = info.coordinate;
      tipEl.innerHTML = `${dir.toUpperCase()}: ${toFixed(info.coordinate)} px`;
    }
    document.addEventListener('mouseup', (e) => {
      if (!positionLineConfig.isMouseDown) return;
      positionLineConfig.isMouseDown = false;
      const nodeInfo = positionLineConfig.currentNodeInfo;
      if (nodeInfo) {
        const { positionEl, id } = nodeInfo;
        const targetCoordinate = getTargetCoordinate(e);

        if (
          (!isY &&
            targetCoordinate.pageX <= offset.left + rulerConfig.yRulerWidth) ||
          (isY &&
            targetCoordinate.pageY <= offset.top + rulerConfig.xRulerHeight)
        ) {
          positionEl.parentNode.removeChild(positionEl);
          delete positionLineConfig.lines[id];
        } else {
          // 重新吸附
          const checkInfo = self._checkAdSorptionLine(
            nodeInfo.coordinate,
            isY,
            nodeInfo.translate
          );
          nodeInfo.translate = checkInfo.translate;
          nodeInfo.coordinate = checkInfo.coordinate;
          self._setLineTranslate(isY, nodeInfo.translate, positionEl);
          delete nodeInfo.originTranslate;
          delete nodeInfo.start;
        }
      }
      self._positionLineChange(isY);
      positionLineConfig.currentNodeInfo = null;
      document.removeEventListener('mousemove', positionLineMoveEvent);
    });
  }
  // 坐标换算为定位线的translate
  _coordinateToTranslate(coordinate, isY) {
    const { scale, canvasConfig } = this.opt;
    const { translateX, translateY } = canvasConfig;
    const distance = coordinate * scale;
    const translate = (isY ? translateY : translateX) + distance;
    return translate;
  }
  // translate换算为坐标
  _translateToCoordinate(opt, isY, translate) {
    const { scale, canvasConfig } = opt;
    const { translateX, translateY } = canvasConfig;
    const distance = translate - (isY ? translateY : translateX);
    return distance / scale;
  }
  // 初始化画布
  _initCanvas() {
    const { opt } = this;
    let canvas = opt.canvasEl;
    if (!canvas) {
      canvas = createDiv();
      canvas.style.position = 'absolute';
      canvas.style.left = 0;
      canvas.style.top = 0;
      canvas.style.transformOrigin = '0 0';
      opt.canvasEl = canvas;
      // 增加四个边坐标的吸附线
      this._modifyAdsorptionLine([0, opt.canvasWidth], true, false);
      this._modifyAdsorptionLine([0, opt.canvasHeight], true, true);
      opt.containerEl.appendChild(canvas);
      opt.containerEl.addEventListener(
        'mousewheel',
        this._mousewheelEvent.bind(this)
      );
    }
    canvas.style.width = opt.canvasWidth + 'px';
    canvas.style.height = opt.canvasHeight + 'px';
    const originScale = opt.scale;
    let scale = originScale;
    const { autoScale, autoCenter } = opt;

    // 自动计算缩放比例
    if (autoScale) {
      const scaleX = (opt.width - 2 * 80) / opt.canvasWidth;
      const scaleY = (opt.height - 2 * 80) / opt.canvasHeight;
      scale = Math.min(scaleX, scaleY);
    }
    let translateX = 0;
    let translateY = 0;
    // 自动居中
    const realWidth = opt.canvasWidth * scale;
    const realHeight = opt.canvasHeight * scale;
    if (autoCenter) {
      translateX = Math.floor((opt.width - realWidth) / 2);
      translateY = Math.floor((opt.height - realHeight) / 2);
      opt.canvasConfig.translateX = translateX;
      opt.canvasConfig.translateY = translateY;
    }
    this._setTranslateBoundary(realWidth, realHeight);
    if (scale !== originScale) {
      opt.scale = scale;
      this._onScale();
    }
    // 画布初始位置
    opt.canvasConfig.originTransform = {
      scale,
      translateX,
      translateY
    };
    if (isObject(opt.canvasStyle)) {
      for (const i in opt.canvasStyle) {
        opt.canvasEl.style[i] = opt.canvasStyle[i];
      }
    }
    this._transformCanvas();
    this._checkLarge();
  }
  // 移动或缩放画布
  _transformCanvas() {
    const { opt } = this;
    const { scale, canvasConfig } = opt;
    opt.canvasEl.style.transform = `translate(${canvasConfig.translateX}px, ${
      canvasConfig.translateY
    }px) scale(${scale})`;

    if (opt.useRuler) {
      this._repaintRuler(false);
      this._repaintRuler(true);
    }
    // 改变所有定位线的translate
    if (opt.usePositionLine) {
      this._changeLinesTranslate();
    }
  }
  // 检查画布与容器的大小
  _checkLarge() {
    const { opt } = this;
    const {
      scale,
      canvasConfig,
      containerConfig,
      useScrollBar,
      scrollBarConfig
    } = opt;
    const { translateX, translateY } = canvasConfig;
    // 画布加上两侧padding的宽度
    const totalWidth = opt.canvasWidth * scale + 2 * opt.containerXPadding;
    // 画布加上两侧padding的高度
    const totalHeight = opt.canvasHeight * scale + 2 * opt.containerYPadding;
    canvasConfig.totalWidth = totalWidth;
    canvasConfig.totalHeight = totalHeight;
    const isXLarge = opt.width < totalWidth;
    const isYLarge = opt.height < totalHeight;
    containerConfig.isLarge = isXLarge || isYLarge;
    containerConfig.isXLarge = isXLarge;
    containerConfig.isYLarge = isYLarge;
    // 是否展示滚动条
    if (useScrollBar) {
      let verticalDisplay = 'none';
      let horizontalDisplay = 'none';
      // 水平方向滚动条
      if (isXLarge) {
        horizontalDisplay = 'block';
        // 未展示过滚动条
        if (!opt.hScrollBar) {
          opt.hScrollBar = this._createScrollBar(false);
        }
        // 滚动条左边距离
        const left = opt.containerXPadding - translateX;
        opt.hScrollBar.style.left = opt.width * (left / totalWidth) + 'px';
        // 滚动条宽度百分比
        const percentage = opt.width / totalWidth;
        // 滚动条宽度
        const width = percentage * opt.width;
        opt.hScrollBar.style.width = width + 'px';
        scrollBarConfig.width = width;
      }
      if (opt.hScrollBar) {
        opt.hScrollBar.style.display = horizontalDisplay;
      }

      if (isYLarge) {
        if (!opt.vScrollBar) {
          opt.vScrollBar = this._createScrollBar(true);
        }
        verticalDisplay = 'block';

        const top = opt.containerYPadding - translateY;
        opt.vScrollBar.style.top = opt.height * (top / totalHeight) + 'px';
        const percentage = opt.height / totalHeight;
        const height = percentage * opt.height;
        opt.vScrollBar.style.height = height + 'px';
        scrollBarConfig.height = height;
      }
      if (opt.vScrollBar) {
        opt.vScrollBar.style.display = verticalDisplay;
      }
    }
  }
  // 移动单个定位线
  _setLineTranslate(isY, translate, node) {
    const transform = isY ? `0, ${translate}px` : `${translate}px, 0`;
    node.style.transform = `translate(${transform})`;
  }
  // 改变定位线的translate,不改变坐标值
  _changeLinesTranslate() {
    const { opt } = this;
    const { lines } = opt.positionLineConfig;
    const ids = Object.keys(lines);
    ids.forEach((id) => {
      const nodeInfo = lines[id];
      const { dir, positionEl, coordinate, tipEl } = nodeInfo;
      const isY = dir === 'y';
      // positionEl.style.transition = 'transform 300ms';
      const translate = this._coordinateToTranslate(coordinate, isY);
      this._setLineTranslate(isY, translate, positionEl);
      this._checkTipPosition(translate, dir, positionEl, tipEl);
      nodeInfo.translate = translate;
    });
  }
  // 检查提示坐标元素的位置
  _checkTipPosition(translate, dir, positionEl, tipEl) {
    const isY = dir === 'y';
    const { width, height } = this.opt;
    if (isY) {
      const tipH = tipEl.offsetHeight;
      const positionH = positionEl.offsetHeight;
      const top = translate + positionH + tipH >= height ? -tipH : positionH;
      tipEl.style.top = top + 'px';
    } else {
      const tipW = tipEl.offsetWidth;
      const positionW = positionEl.offsetWidth;
      const left = translate + positionW + tipW >= width ? -tipW : positionW;
      tipEl.style.left = left + 'px';
    }
  }
  // 鼠标滚轮事件
  _mousewheelEvent(e) {
    e.preventDefault();
    // 双指缩放事件
    if (e.metaKey || e.ctrlKey) {
      const changeScale = (-1 * e.deltaY) / 100;
      const newScale = this.opt.scale + changeScale;
      this.changeScale(newScale);
    } else {
      // 单指
      const {
        scrollBarConfig,
        containerConfig,
        canvasConfig,
        hScrollBar,
        vScrollBar
      } = this.opt;
      if (!containerConfig.isLarge || scrollBarConfig.isMouseDown) return;
      e.preventDefault();
      if (this.opt.wheelTimer) {
        clearTimeout(this.opt.wheelTimer);
      }
      const moveX = -e.deltaX;
      const moveY = -e.deltaY;
      let scrollDirection = '';
      const { opacity = 0.4 } = this.opt.scrollBarConfig;
      let { translateX, translateY } = canvasConfig;
      if (containerConfig.isXLarge && Math.abs(moveX) > Math.abs(moveY)) {
        scrollDirection = 'h';
        translateX += moveX;

        translateX = Math.max(
          Math.min(translateX, canvasConfig.maxTranslateX),
          canvasConfig.minTranslateX
        );
        const left = this.opt.containerXPadding - translateX;
        // 展示
        hScrollBar.style.opacity = opacity;
        if (vScrollBar) vScrollBar.style.opacity = 0;
        hScrollBar.style.left =
          this.opt.width * (left / canvasConfig.totalWidth) + 'px';
        canvasConfig.translateX = translateX;
        this._onMove(translateX, translateY);
      }
      if (containerConfig.isYLarge && Math.abs(moveY) > Math.abs(moveX)) {
        scrollDirection = 'v';
        translateY += moveY;
        translateY = Math.max(
          Math.min(translateY, canvasConfig.maxTranslateY),
          canvasConfig.minTranslateY
        );
        // 展示
        vScrollBar.style.opacity = opacity;
        if (hScrollBar) hScrollBar.style.opacity = 0;

        const top = this.opt.containerYPadding - translateY;
        vScrollBar.style.top =
          this.opt.height * (top / canvasConfig.totalHeight) + 'px';
        canvasConfig.translateY = translateY;
        this._onMove(translateX, translateY);
      }
      this._transformCanvas();
      // 不滚动后300ms隐藏滚动条
      if (scrollDirection) {
        this.opt.wheelTimer = setTimeout(() => {
          if (this.opt.scrollBarConfig.isMouseEnter) return;
          const bar = scrollDirection === 'h' ? hScrollBar : vScrollBar;
          bar.style.opacity = 0;
        }, 1000);
      }
    }
  }
  // 移动回调
  _onMove(translateX, translateY) {
    if (typeof this.opt.onMove === 'function') {
      this.opt.onMove(translateX, translateY);
    }
  }
  // 创建滚动条
  _createScrollBar(isVertical) {
    const { opt } = this;
    const bar = createDiv();
    const styles = {
      position: 'absolute',
      display: 'none',
      borderRadius: '4px',
      backgroundColor: '#000000',
      opacity: 0,
      transition: 'opacity 300ms',
      cursor: 'pointer',
      zIndex: opt.scrollBarConfig.zIndex
    };
    if (isVertical) {
      styles.right = 0;
      styles.width = '8px';
    } else {
      styles.bottom = 0;
      styles.height = '8px';
    }
    setStyle(bar, styles);
    // 滚动条事件绑定
    this._addScrollBarEvent(bar, isVertical);
    opt.containerEl.appendChild(bar);
    return bar;
  }
  // 滚动条事件绑定
  _addScrollBarEvent(bar, isVertical) {
    const { opt } = this;
    const { scrollBarConfig, canvasConfig } = opt;
    const mousemoveEvent = (e) => {
      e.preventDefault();
      if (!scrollBarConfig.isMouseDown) return;
      let { translateX, translateY } = canvasConfig;
      const targetCoordinate = getTargetCoordinate(e);

      if (isVertical) {
        const move = targetCoordinate.pageY - scrollBarConfig.startY;
        let barTop = scrollBarConfig.top + move;
        barTop = Math.min(
          Math.max(0, barTop),
          opt.height - scrollBarConfig.height
        );
        bar.style.top = barTop + 'px';
        const top = (barTop * canvasConfig.totalHeight) / opt.height;
        translateY = opt.containerYPadding - top;
        canvasConfig.translateY = translateY;
      } else {
        const move = targetCoordinate.pageX - scrollBarConfig.startX;
        let barLeft = scrollBarConfig.left + move;
        barLeft = Math.min(
          Math.max(0, barLeft),
          opt.width - scrollBarConfig.width
        );
        bar.style.left = barLeft + 'px';
        const left = (barLeft * canvasConfig.totalWidth) / opt.width;
        translateX = opt.containerXPadding - left;
        canvasConfig.translateX = translateX;
      }
      this._transformCanvas();
      this._onMove(translateX, translateY);
    };
    const mousedownEvent = function (e) {
      e.preventDefault();
      scrollBarConfig.isMouseDown = true;
      const targetCoordinate = getTargetCoordinate(e);
      if (isVertical) {
        scrollBarConfig.startY = targetCoordinate.pageY;
        scrollBarConfig.top = parseFloat(bar.style.top);
      } else {
        scrollBarConfig.left = parseFloat(bar.style.left);
        scrollBarConfig.startX = targetCoordinate.pageX;
      }
      document.addEventListener('mousemove', mousemoveEvent);
    };
    bar.addEventListener('mouseenter', () => {
      scrollBarConfig.isMouseEnter = true;
      bar.style.opacity = scrollBarConfig.opacity;
      // 另一个隐藏
      if (isVertical) {
        if (scrollBarConfig.hScrollBar)
          scrollBarConfig.hScrollBar.style.opacity = 0;
      } else {
        if (scrollBarConfig.vScrollBar)
          scrollBarConfig.vScrollBar.style.opacity = 0;
      }
    });
    bar.addEventListener('mouseleave', () => {
      if (scrollBarConfig.isMouseDown) return;
      scrollBarConfig.isMouseEnter = false;
      bar.style.opacity = 0;
    });
    // 鼠标按下事件
    bar.addEventListener('mousedown', mousedownEvent);
    // 鼠标按下松开
    document.addEventListener('mouseup', () => {
      if (!scrollBarConfig.isMouseDown) return;
      scrollBarConfig.isMouseDown = false;
      scrollBarConfig.isMouseEnter = false;
      document.removeEventListener('mousemove', mousemoveEvent);
    });
  }
  // 修改吸附线
  _modifyAdsorptionLine(data, isAdd = true, isY = true) {
    const { adsorptionXList, adsorptionYList } = this.opt.positionLineConfig;
    const list = isY ? adsorptionYList : adsorptionXList;
    data.forEach((value) => {
      const index = list.indexOf(value);
      if (isAdd) {
        if (index === -1) {
          list.push(value);
        }
      } else {
        if (index > -1) {
          list.splice(index, 1);
        }
      }
    });
    if (isAdd) {
      list.sort((a, b) => a - b);
    }
    // 吸附线变化回调
    if (typeof this.opt.adsorptionLineChange === 'function') {
      this.opt.adsorptionLineChange(list, isY);
    }
  }
  // 获取画布元素
  getCanvasEl() {
    return this.opt.canvasEl;
  }
  // 更新画布的宽高
  updateCanvasRect({ width, height }) {
    if (height) {
      this.opt.canvasHeight = height;
    }
    if (width) {
      this.opt.canvasWidth = width;
    }
    this._initCanvas();
  }
  // 删除吸附线
  removeAdsorptionLine(data, isY) {
    this._modifyAdsorptionLine(data, false, isY);
  }
  // 增加吸附线
  addAdsorptionLine(data, isY) {
    this._modifyAdsorptionLine(data, true, isY);
  }
  // 改变大小
  changeScale(newScale) {
    if (!this.opt.canScale) return;
    const { opt } = this;
    const { scale, canvasConfig } = opt;
    let { translateX, translateY } = canvasConfig;
    newScale = Math.min(Math.max(newScale, opt.minScale), opt.maxScale);
    const change = newScale - scale;

    opt.scale = newScale;
    const newCanvasW = opt.canvasWidth * newScale;
    const newCanvasH = opt.canvasHeight * newScale;

    this._setTranslateBoundary(newCanvasW, newCanvasH);

    translateX -= (change * opt.canvasWidth) / 2;
    translateY -= (change * opt.canvasHeight) / 2;

    translateX = Math.max(
      Math.min(translateX, canvasConfig.maxTranslateX),
      canvasConfig.minTranslateY
    );
    translateY = Math.max(
      Math.min(translateY, canvasConfig.maxTranslateY),
      canvasConfig.minTranslateY
    );
    canvasConfig.translateX = translateX;
    canvasConfig.translateY = translateY;
    this._transformCanvas();
    this._checkLarge();
    this._onScale();
  }
  /**
   * 缩放回调
   */
  _onScale() {
    if (typeof this.opt.onScale === 'function') {
      this.opt.onScale(this.opt.scale);
    }
  }
  /**
   * 定位线变化回调
   */
  _positionLineChange(isY) {
    const { lines } = this.opt.positionLineConfig;
    const list = Object.values(lines)
      .filter((line) => (line.dir === isY ? 'y' : 'x'))
      .map((line) => line.coordinate);
    if (typeof this.opt.positionLineChange === 'function') {
      typeof this.opt.positionLineChange(list, isY);
    }
  }
  // 删除所有定位线
  removeAllPositionLine() {
    const { lines, positionLineWrapEl } = this.opt.positionLineConfig;
    for (const id in lines) {
      const { positionEl } = lines[id];
      positionLineWrapEl.removeChild(positionEl);
    }
    this.opt.positionLineConfig.lines = [];
  }
  // 隐藏
  hideAllPositionLine() {
    const { lines } = this.opt.positionLineConfig;
    for (const id in lines) {
      const { positionEl } = lines[id];
      positionEl.style.display = 'none';
    }
  }
  // 显示定位线
  showAllPositionLine() {
    const { lines } = this.opt.positionLineConfig;
    for (const id in lines) {
      const { positionEl } = lines[id];
      positionEl.style.display = 'block';
    }
  }
  _toggleRuler(hide = true) {
    const { opt } = this;
    const display = hide ? 'none' : 'block';
    if (opt.hRuler) opt.hRuler.style.display = display;
    if (opt.vRuler) opt.vRuler.style.display = display;
    // 同时显示/隐藏定位线
    if (hide) {
      this.hideAllPositionLine();
    } else {
      this.showAllPositionLine();
    }
  }
  // 隐藏标尺
  hideRuler() {
    this._toggleRuler();
  }
  showRuler() {
    this._toggleRuler(false);
  }
  // 禁止缩放
  forbidScale() {
    this.opt.canScale = false;
  }
  // 允许缩放
  allowScale() {
    this.opt.canScale = true;
  }
  // 还原
  reset() {
    const { originTransform } = this.opt.canvasConfig;
    if (originTransform) {
      const { scale, translateX, translateY } = originTransform;
      this.opt.scale = scale;
      this.opt.canvasConfig.translateX = translateX;
      this.opt.canvasConfig.translateY = translateY;
      this._transformCanvas();
      this._checkLarge();
    }
  }
}
