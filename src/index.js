import {
  isObject,
  toFixed,
  deepMerge,
  getGridSize,
  getOffset,
  setStyle,
  getTargetCoordinate
} from './utils';
const defaultOpt = {
  // 画布缩放比例
  scale: 1,
  // 最大缩放比例
  maxScale: 10,
  // 最小缩放比例
  minScale: 0.1,
  // 初始化是否自动居中
  autoCenter: true,
  // 初始化时是否自动计算画布缩放比例，此时忽略scale
  autoScale: 1,
  // 是否自动计算容器的宽高，默认false，为true会监控container宽高变化并重新绘制
  containerAutoSize: false,
  // 容器宽度，containerAutoSize为true后，不取该值
  width: 1000,
  // 容器高度，containerAutoSize为true后，不取该值
  height: 500,
  padding: 80,
  verticalPadding: undefined,
  horizontalPadding: undefined,
  canvasWidth: 1920,
  canvasHeight: 2000,
  // 是否代理放大和缩小快捷键 ctrl+ "+" 和 ctrl + "-"
  proxyScaleKey: true,
  // 是否展示滚动条
  showScrollBar: true,
  // 是否展示标尺
  showRuler: true,
  // 是否使用定位线
  usePositionLine: true,
  positionLineConfig: {
    lineColor: '#24aa61',
    padding: 3,
    adsorptionXList: [],
    adsorptionYList: [],
    // 吸附距离
    adsorpGap: 4
  },
  // 画布的样式
  canvasStyle: {},
  // 滚动条配置
  scrollConfig: {
    backgroundColor: '#000000',
    opacity: 0.4
  },
  // 标尺配置
  rulerConfig: {
    // 垂直标尺的宽度
    verticalRulerWidth: 30,
    // 水平标尺的高度
    horizontalRulerHeight: 30,
    // 标尺背景色
    bgColor: '#efefef',
    // 标尺数值的颜色
    fontColor: '#000000',
    // 标尺数值的字体大小
    fontSize: 12,
    // 标尺数值的字体
    fontFamily: 'Arial',
    // 标尺刻度线的颜色
    lineColor: '#000000'
  },
  // 画布缩放回调
  onScale: () => {},
  // 画布移动回调
  onMove: () => {}
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
    const opt = deepMerge(defaultOpt, options);
    this._checkOptions(opt);
    // todo 所有的计算数据都改为私有变量，不让外部获取
    opt.containerConfig = {};
    opt.canvasConfig = {};
    this.opt = opt;
    this._initContainer();
    this._initCanvas();

    if (opt.proxyScaleKey) {
      document.addEventListener('keydown', this._keydownEvent);
    }
    if (opt.showScrollBar) {
      opt.wheelTimer = null;
    }
  }
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
  // 快捷键放大缩小
  _keydownEvent(e) {
    const keyCode = e.keyCode;
    if ((e.metaKey || e.ctrlKey) && (keyCode === 187 || keyCode === 189)) {
      e.preventDefault();
      let newScale = this.opt.scale + (keyCode === 187 ? 0.05 : -0.05);
      this.changeScale(newScale);
    }
  }

  // 获取移动边界
  _setTranslateBoundary(realWidth, realHeight) {
    const { opt } = this;
    const { width, height, horizontalPadding, verticalPadding } = opt;

    const maxTranslateX = Math.max((width - realWidth) / 2, horizontalPadding);
    const maxTranslateY = Math.max((height - realHeight) / 2, verticalPadding);
    const minTranslateX =
      realWidth + 2 * horizontalPadding > width
        ? width - (realWidth + horizontalPadding)
        : maxTranslateX;
    const minTranslateY =
      realHeight + 2 * verticalPadding > height
        ? height - (realHeight + verticalPadding)
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
      width = opt.width;
      height = opt.height;
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
    opt.horizontalPadding = opt.horizontalPadding || opt.padding;
    opt.verticalPadding = opt.verticalPadding || opt.padding;
    opt.containerEl.style.overflow = 'hidden';
    if (opt.showRuler) {
      this._initRuler(resize);
    }
  }
  // 监听容器变化
  _onContainerResize() {
    const { opt } = this;
    const { containerEl, containerConfig } = opt;
    containerConfig.addResize = true;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
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
      ? rulerConfig.verticalRulerWidth
      : rulerConfig.horizontalRulerHeight;
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
    ctx.font = `${rulerConfig.fontSize * ratio}px ${rulerConfig.fontFamily}`;
    ctx.translate(0.5, 0.5);
    ctx.scale(1 / ratio, 1 / ratio);
    if (isVertical) {
      ctx.fillRect((padding - 1) * ratio, 0, 1, height * ratio);
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
        ctx.fillRect((padding - gap) * ratio, x, gap * ratio, 1);
      } else {
        ctx.fillRect(x, (padding - gap) * ratio, 1, gap * ratio);
        if (i % 10 === 0) {
          ctx.fillStyle = rulerConfig.fontColor;
          ctx.fillText(
            String(i * gridSize),
            x + 2 * ratio,
            (padding + 8 - gap) * ratio
          );
        }
      }
    }
    ctx.restore();
    if (isVertical) {
      ctx.font = `${rulerConfig.fontSize}px ${rulerConfig.fontFamily}`;
      let i = startValue;
      while (i <= endValue) {
        if (i % 10) {
          i++;
        } else {
          ctx.save();
          const y = translate + i * gridPixel + padding / 2;
          ctx.translate(y + padding / 5, y - (padding * 6) / 5);
          ctx.rotate(Math.PI / 2);
          ctx.fillText(String(i * gridSize), (padding * 4) / 5, y);
          i += 10;
          ctx.restore();
        }
      }
    }
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
    opt.hRuler.setAttribute('height', rulerConfig.horizontalRulerHeight);
    opt.vRuler.setAttribute('height', opt.height);
    opt.vRuler.setAttribute('width', rulerConfig.verticalRulerWidth);
  }
  _createRuler(isVertical) {
    const { opt } = this;
    const ruler = document.createElement('canvas');
    ruler.style.position = 'absolute';
    ruler.style.left = 0;
    ruler.style.top = 0;
    ruler.style.zIndex = isVertical ? 100 : 101;
    opt.containerEl.appendChild(ruler);
    if (opt.usePositionLine) {
      this._initPositionLine(opt, isVertical, ruler);
    }
    return ruler;
  }
  _initPositionLine(opt, isVertical, ruler) {
    const { positionLineConfig, rulerConfig } = opt;
    positionLineConfig.id = positionLineConfig.id || 0;
    positionLineConfig.lines = positionLineConfig.lines || {};
    const { lineColor, padding } = positionLineConfig;
    let positionLineWrapEl = positionLineConfig.positionLineWrapEl;
    if (!positionLineWrapEl) {
      positionLineWrapEl = document.createElement('div');
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
          targetCoordinate.pageY >
          offset.top + rulerConfig.horizontalRulerHeight
            ? 'visible'
            : 'none';
        translate = targetCoordinate.pageY - offset.top;
      } else {
        positionEl.style.visibility =
          targetCoordinate.pageX > offset.left + rulerConfig.verticalRulerWidth
            ? 'visible'
            : 'none';
        translate = targetCoordinate.pageX - offset.left;
      }
      const coordinate = self._getCoordinate(opt, dir, translate);
      // 检查吸附线
      const info = self._checkAdSorptionLine(coordinate, dir, translate);
      self._changeNodeTranslate(dir, info.translate, positionEl);
      nodeInfo.translate = info.translate;
      nodeInfo.coordinate = info.coordinate;
      tipEl.innerHTML = `${dir.toUpperCase()}: ${toFixed(info.coordinate)} px`;
    }
    ruler.addEventListener('mousedown', () => {
      rulerConfig.isMouseDown = true;
      const positionEl = document.createElement('div');
      const positionElStyle = {
        position: 'absolute',
        visibility: 'hidden',
        backgroundColor: 'transparent',
        zIndex: 1000
      };
      const lineEl = document.createElement('div');
      const lineElStyle = {
        position: 'absolute',
        backgroundColor: lineColor
      };
      // todo 根据定位线的位置判断tipEl的位置，以免遮挡
      const tipEl = document.createElement('div');
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
      if (isVertical) {
        Object.assign(positionElStyle, {
          width: 2 * padding + 1 + 'px',
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
          right: 2 * padding + 6 + 'px',
          transform: `translate(0, -50%)`
        });
        // 水平方向定位线
        dir = 'x';
      } else {
        Object.assign(positionElStyle, {
          height: 2 * padding + 1 + 'px',
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
          bottom: 2 * padding + 6 + 'px',
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

      document.addEventListener('mouseup', (e) => {
        if (!rulerConfig.isMouseDown) return;
        rulerConfig.isMouseDown = false;
        const targetCoordinate = getTargetCoordinate(e);

        const nodeInfo = positionLineConfig.currentNodeInfo;
        if (nodeInfo) {
          const { positionEl, dir, tipEl, id } = nodeInfo;
          const isY = dir === 'y';
          if (
            (!isY &&
              targetCoordinate.pageX <=
                offset.left + rulerConfig.verticalRulerWidth) ||
            (isY &&
              targetCoordinate.pageY <=
                offset.top + rulerConfig.horizontalRulerHeight)
          ) {
            positionLineWrapEl.removeChild(positionEl);
            delete positionLineConfig.lines[id];
          } else {
            tipEl.style.display = 'none';
            // positionEl事件监听
            this._addPosisitionLineEvent(nodeInfo, offset);
          }
        }
        positionLineConfig.currentNodeInfo = null;
        document.removeEventListener('mousemove', rulerMouseMoveEvent);
      });
    });
  }
  _coordinateToTranslate(coordinate, dir) {
    const { scale, canvasConfig } = this.opt;
    const { translateX, translateY } = canvasConfig;
    const distance = coordinate * scale;
    const translate = (dir === 'y' ? translateY : translateX) + distance;
    return translate;
  }
  // 检查吸附线
  _checkAdSorptionLine(coordinate, dir, translate) {
    const { adsorptionXList, adsorptionYList, adsorpGap } =
      this.opt.positionLineConfig;
    let list = dir === 'y' ? adsorptionYList : adsorptionXList;
    const res = { coordinate, translate };
    let len = list.length;
    if (len > 0) {
      let start = 0;
      while (start < len) {
        const value = list[start];
        if (Math.abs(coordinate - value) <= adsorpGap) {
          // 可以吸附
          res.coordinate = value;
          res.translate = this._coordinateToTranslate(value, dir);
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
  // 给定位线增加事件监听
  _addPosisitionLineEvent(nodeInfo, offset) {
    const { positionEl, tipEl, dir } = nodeInfo;
    const { positionLineConfig, rulerConfig } = this.opt;
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
      nodeInfo.start =
        dir === 'y' ? targetCoordinate.pageY : targetCoordinate.pageX;
      nodeInfo.originTranslate = nodeInfo.translate;
      nodeInfo.tipEl.style.display = 'block';
      positionLineConfig.currentNodeInfo = nodeInfo;
      document.addEventListener('mousemove', positionLineMoveEvent);
    });
    const self = this;
    function positionLineMoveEvent(e) {
      if (!positionLineConfig.isMouseDown) return;
      e.preventDefault();
      const nodeInfo = positionLineConfig.currentNodeInfo;
      const targetCoordinate = getTargetCoordinate(e);

      const { dir, tipEl, start, originTranslate = 0, positionEl } = nodeInfo;
      const isY = dir === 'y';
      const move =
        (isY ? targetCoordinate.pageY : targetCoordinate.pageX) - start;
      let translate = originTranslate + move;
      // 更新坐标数据
      const coordinate = self._getCoordinate(self.opt, dir, translate);
      // 检查吸附线
      const info = self._checkAdSorptionLine(coordinate, dir, translate);
      self._changeNodeTranslate(dir, info.translate, positionEl);
      nodeInfo.translate = info.translate;
      nodeInfo.coordinate = info.coordinate;
      tipEl.innerHTML = `${dir.toUpperCase()}: ${toFixed(info.coordinate)} px`;
    }
    document.addEventListener('mouseup', (e) => {
      if (!positionLineConfig.isMouseDown) return;
      positionLineConfig.isMouseDown = false;
      const nodeInfo = positionLineConfig.currentNodeInfo;
      if (nodeInfo) {
        const { positionEl, dir, id } = nodeInfo;
        const isY = dir === 'y';
        const targetCoordinate = getTargetCoordinate(e);

        if (
          (!isY &&
            targetCoordinate.pageX <=
              offset.left + rulerConfig.verticalRulerWidth) ||
          (isY &&
            targetCoordinate.pageY <=
              offset.top + rulerConfig.horizontalRulerHeight)
        ) {
          positionEl.parentNode.removeChild(positionEl);
          delete positionLineConfig.lines[id];
        } else {
          delete nodeInfo.originTranslate;
          delete nodeInfo.start;
        }
      }
      positionLineConfig.currentNodeInfo = null;
      document.removeEventListener('mousemove', positionLineMoveEvent);
    });
  }
  _getCoordinate(opt, dir, translate) {
    const { scale, canvasConfig } = opt;
    const { translateX, translateY } = canvasConfig;
    const distance = translate - (dir === 'y' ? translateY : translateX);
    return distance / scale;
  }
  // 初始化画布
  _initCanvas() {
    const { opt } = this;
    let canvas = opt.canvasEl;
    if (!canvas) {
      canvas = document.createElement('div');
      canvas.style.position = 'absolute';
      canvas.style.left = 0;
      canvas.style.top = 0;
      // todo 移动的时候取消给定位线添加缓动参数
      canvas.style.transition = 'transform 300ms';
      canvas.style.transformOrigin = '0 0';
      opt.canvasEl = canvas;
      // 增加四个边坐标的吸附线
      this._modifyAdsortptionLine([
        { value: opt.canvasWidth, dir: 'x' },
        { value: 0, dir: 'x' },
        { value: 0, dir: 'y' },
        { value: opt.canvasHeight, dir: 'y' }
      ]);
      opt.containerEl.appendChild(canvas);
      opt.containerEl.addEventListener(
        'mousewheel',
        this._mousewheelEvent.bind(this)
      );
    }
    canvas.style.width = opt.canvasWidth + 'px';
    canvas.style.height = opt.canvasHeight + 'px';
    let { scale, autoScale, autoCenter } = opt;

    // 自动计算缩放比例
    if (autoScale) {
      const scaleX = (opt.width - 2 * opt.horizontalPadding) / opt.canvasWidth;
      const scaleY = (opt.height - 2 * opt.verticalPadding) / opt.canvasHeight;
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
    }
    this._setTranslateBoundary(realWidth, realHeight);
    opt.scale = scale;

    if (isObject(opt.canvasStyle)) {
      for (let i in opt.canvasStyle) {
        opt.canvasEl.style[i] = opt.canvasStyle[i];
      }
    }
    this._transform(translateX, translateY, true);
    this._checkLarge();
  }
  _transform(translateX, translateY) {
    let { opt } = this;
    const { scale, canvasConfig } = opt;
    opt.canvasEl.style.transform = `translate(${translateX}px, ${
      translateY
    }px) scale(${scale})`;

    const changeX = translateX - canvasConfig.translateX;
    const changeY = translateY - canvasConfig.translateY;
    canvasConfig.translateX = translateX;
    canvasConfig.translateY = translateY;
    if (opt.showRuler) {
      this._repaintRuler(false);
      this._repaintRuler(true);
    }
    // 改变所有定位线的translate
    if (opt.usePositionLine) {
      this._changeLinesTranslate(changeX, changeY);
    }
  }
  // 检查与wrap的大小
  _checkLarge() {
    let { opt } = this;
    const {
      scale,
      canvasConfig,
      containerConfig,
      showScrollBar,
      scrollConfig
    } = opt;
    const { translateX, translateY } = canvasConfig;
    // 画布加上两侧padding的宽度
    const totalWidth = opt.canvasWidth * scale + 2 * opt.horizontalPadding;
    // 画布加上两侧padding的高度
    const totalHeight = opt.canvasHeight * scale + 2 * opt.verticalPadding;
    canvasConfig.totalWidth = totalWidth;
    canvasConfig.totalHeight = totalHeight;
    const isXLarge = opt.width < totalWidth;
    const isYLarge = opt.height < totalHeight;
    containerConfig.isLarge = isXLarge || isYLarge;
    containerConfig.isXLarge = isXLarge;
    containerConfig.isYLarge = isYLarge;
    // 是否展示滚动条
    if (showScrollBar) {
      let verticalDisplay = 'none';
      let horizontalDisplay = 'none';
      // 水平方向滚动条
      if (isXLarge) {
        horizontalDisplay = 'block';
        // 未展示过滚动条
        if (!opt.hScrollBar) {
          opt.hScrollBar = this._createScollBar(false);
        }
        // 滚动条左边距离
        let left = opt.horizontalPadding - translateX;
        opt.hScrollBar.style.left = opt.width * (left / totalWidth) + 'px';
        // 滚动条宽度百分比
        const percentage = opt.width / totalWidth;
        // 滚动条宽度
        let width = percentage * opt.width;
        opt.hScrollBar.style.width = width + 'px';
        scrollConfig.width = width;
      }
      if (opt.hScrollBar) {
        opt.hScrollBar.style.display = horizontalDisplay;
      }

      if (isYLarge) {
        if (!opt.vScollBar) {
          opt.vScollBar = this._createScollBar(true);
        }
        verticalDisplay = 'block';

        let top = opt.verticalPadding - translateY;
        opt.vScollBar.style.top = opt.height * (top / totalHeight) + 'px';
        const percentage = opt.height / totalHeight;
        let height = percentage * opt.height;
        opt.vScollBar.style.height = height + 'px';
        scrollConfig.height = height;
      }
      if (opt.vScollBar) {
        opt.vScollBar.style.display = verticalDisplay;
      }
    }
  }
  // 移动单个定位线
  _changeNodeTranslate(dir, translate, node) {
    const transform = dir === 'y' ? `0, ${translate}px` : `${translate}px, 0`;
    node.style.transform = `translate(${transform})`;
  }
  // 改变定位线的tranlate,不改变坐标值
  _changeLinesTranslate(changeX, changeY) {
    const { opt } = this;
    const { lines } = opt.positionLineConfig;
    const ids = Object.keys(lines);
    ids.forEach((id) => {
      const nodeInfo = lines[id];
      const { dir, positionEl } = nodeInfo;
      let { translate } = nodeInfo;
      translate += dir === 'y' ? changeY : changeX;
      this._changeNodeTranslate(dir, translate, positionEl);
      nodeInfo.translate = translate;
    });
  }
  // 鼠标滚轮事件
  _mousewheelEvent(e) {
    e.preventDefault();
    // 双指事件
    if (e.metaKey || e.ctrlKey) {
      const changeScale = (-1 * e.deltaY) / 100;
      const newScale = this.opt.scale + changeScale;
      this.changeScale(newScale);
    } else {
      let {
        scrollConfig,
        containerConfig,
        canvasConfig,
        hScrollBar,
        vScollBar
      } = this.opt;
      if (!containerConfig.isLarge || scrollConfig.isDown) return;
      e.preventDefault();
      if (this.opt.wheelTimer) {
        clearTimeout(this.opt.wheelTimer);
      }
      const moveX = -e.deltaX;
      const moveY = -e.deltaY;
      let scrollDirection = '';
      const { opacity = 0.4 } = this.opt.scrollConfig;
      let { translateX, translateY } = canvasConfig;
      if (containerConfig.isXLarge && Math.abs(moveX) > Math.abs(moveY)) {
        scrollDirection = 'h';
        translateX += moveX;

        translateX = Math.max(
          Math.min(translateX, canvasConfig.maxTranslateX),
          canvasConfig.minTranslateX
        );
        let left = this.opt.horizontalPadding - translateX;
        // 展示
        hScrollBar.style.opacity = opacity;
        if (vScollBar) vScollBar.style.opacity = 0;
        hScrollBar.style.left =
          this.opt.width * (left / canvasConfig.totalWidth) + 'px';
        this._transform(translateX, translateY);
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
        vScollBar.style.opacity = opacity;
        if (hScrollBar) hScrollBar.style.opacity = 0;

        let top = this.opt.verticalPadding - translateY;
        vScollBar.style.top =
          this.opt.height * (top / canvasConfig.totalHeight) + 'px';
        this._transform(translateX, translateY);
        this._onMove(translateX, translateY);
      }
      // 不滚动后300ms隐藏滚动条
      if (scrollDirection) {
        this.opt.wheelTimer = setTimeout(() => {
          if (this.opt.scrollConfig.isMouseEnter) return;
          const bar = scrollDirection === 'h' ? hScrollBar : vScollBar;
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
  _createScollBar(isVertical) {
    const { opt } = this;
    const { scrollConfig } = opt;
    const self = this;
    let bar = document.createElement('div');
    const styles = {
      position: 'absolute',
      display: 'none',
      borderRadius: '4px',
      backgroundColor: '#000000',
      opacity: 0,
      transition: 'opacity 300ms',
      cursor: 'pointer',
      zIndex: 200
    };
    if (isVertical) {
      styles.right = 0;
      styles.width = '8px';
    } else {
      styles.bottom = 0;
      styles.height = '8px';
    }
    setStyle(bar, styles);
    const mousemoveEvent = function (e) {
      e.preventDefault();
      if (!opt.scrollConfig.isDown) return;
      const { scrollConfig, canvasConfig } = opt;
      let { translateX, translateY } = canvasConfig;
      const targetCoordinate = getTargetCoordinate(e);

      if (isVertical) {
        let move = targetCoordinate.pageY - scrollConfig.startY;
        let barTop = scrollConfig.top + move;
        barTop = Math.min(
          Math.max(0, barTop),
          opt.height - scrollConfig.height
        );
        bar.style.top = barTop + 'px';
        const top = (barTop * canvasConfig.totalHeight) / opt.height;
        translateY = opt.verticalPadding - top;
      } else {
        let move = targetCoordinate.pageX - scrollConfig.startX;
        let barLeft = scrollConfig.left + move;
        barLeft = Math.min(
          Math.max(0, barLeft),
          opt.width - scrollConfig.width
        );
        bar.style.left = barLeft + 'px';
        const left = (barLeft * canvasConfig.totalWidth) / opt.width;
        translateX = opt.horizontalPadding - left;
      }
      self._transform(translateX, translateY);
      self.onMove(translateX, translateY);
    };
    const mousedownEvent = function (e) {
      scrollConfig.isDown = true;
      const targetCoordinate = getTargetCoordinate(e);

      if (isVertical) {
        scrollConfig.startY = targetCoordinate.pageY;
        scrollConfig.top = parseFloat(this.style.top);
      } else {
        scrollConfig.left = parseFloat(this.style.left);
        scrollConfig.startX = targetCoordinate.pageX;
      }
      document.addEventListener('mousemove', mousemoveEvent);
    };
    bar.addEventListener('mouseenter', () => {
      scrollConfig.isMouseEnter = true;
      bar.style.opacity = scrollConfig.opacity;
      // 另一个隐藏
      if (isVertical) {
        if (scrollConfig.hScrollBar) scrollConfig.hScrollBar.style.opacity = 0;
      } else {
        if (scrollConfig.vScrollBar) scrollConfig.vScrollBar.style.opacity = 0;
      }
    });
    bar.addEventListener('mouseleave', () => {
      if (scrollConfig.isDown) return;
      scrollConfig.isMouseEnter = false;
      bar.style.opacity = 0;
    });
    // 鼠标按下事件
    bar.addEventListener('mousedown', mousedownEvent);
    // 鼠标按下松开
    document.addEventListener('mouseup', () => {
      scrollConfig.isDown = false;
      scrollConfig.isMouseEnter = false;
      document.removeEventListener('mousemove', mousemoveEvent);
    });
    opt.containerEl.appendChild(bar);
    return bar;
  }

  // 获取画布元素
  getCanvasEl() {
    return this.opt.canvasEl;
  }
  // 更新画布的宽高
  updateCanvasRect({ canvasWidth, canvasHeight }) {
    if (canvasHeight) {
      this.opt.canvasHeight = canvasHeight;
    }
    if (canvasWidth) {
      this.opt.canvasWidth = canvasWidth;
    }
    this._initCanvas();
  }
  // 修改吸附线
  _modifyAdsortptionLine(data, remove = false) {
    const { adsorptionXList, adsorptionYList } = this.opt.positionLineConfig;
    data.forEach(({ dir, value }) => {
      const list = dir === 'y' ? adsorptionYList : adsorptionXList;
      const index = list.indexOf(value);
      if (index > -1) {
        if (remove) {
          list.splice(index, 1);
        }
      } else {
        if (!remove) {
          list.push(value);
        }
      }
    });
    if (!remove) {
      // 排序
      adsorptionXList.sort((a, b) => a - b);
      adsorptionYList.sort((a, b) => a - b);
    }
  }
  // 删除吸附线
  removeAdsotptionLine(data) {
    this._modifyAdsortptionLine(data, true);
  }
  // 增加吸附线
  addAdsortptionLine(data) {
    this._modifyAdsortptionLine(data);
  }
  // 改变大小
  changeScale(newScale) {
    const { opt } = this;
    let { scale, canvasConfig } = opt;
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

    this._transform(translateX, translateY);
    // 回调onScale
    if (typeof opt.onScale === 'function') {
      opt.onScale(opt.scale);
    }
    this._checkLarge();
  }
}
