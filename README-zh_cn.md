一个javascript公用组件，构建低代码平台的绝佳助手，支持在区域内自由移动、缩放画布，包含标尺、定位线和吸附线功能。

[示例](https://imaluna.github.io/scale-ruler/examples/index.html)

## 特性

- 支持快捷键缩放（如ctrl + '+' 放大，ctrl + '-'缩小）、鼠标缩放、触摸板双指捏合缩放
- 支持自由移动、滚动条移动
- 接入简单快捷


## 安装

### 使用包管理器

```shell
npm install scale-ruler --save
or
yarn add scale-ruler
# or
pnpm add scale-ruler
# or
bun add scale-ruler
```

### 浏览器直接引入

#### unpkg

```html
<head>
  <script src="//unpkg.com/scale-ruler"></script>
</head>
```

#### jsDelivr

```html
<head>
  <script src="//cdn.jsdelivr.net/npm/scale-ruler"></script>
</head>

## 快速开始

```html
<div id="wrap"></div>

<script>
let _scale = 0;
let adsorptionXList = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
  1500, 1600, 1700, 1800
];
let adsorptionYList = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const opt = {
  el: '#wrap',
  containerAutoSize: true,
  autoCenter: true,
  autoScale: true,
  canvasStyle: {
    backgroundColor: '#fff'
  },
  positionLineConfig: {
    adsorptionXList,
    adsorptionYList
  },
  onScale(scale) {
    _scale = scale;
  },
  onMove(translateX, translateY) {
  },
  adsorptionLineChange(list, isY) {
    if (isY) {
      adsorptionYList = list;
    } else {
      adsorptionXList = list;
    }
    setInputValue(list, isY);
  },
  positionLineChange(list, isY) {
  }
};
const ruler = new ScaleRuler(opt);

// 获取画布元素
const canvasEl = ruler.getCanvasEl();
// 禁止缩放画布
ruler.forbidScale()
// 允许缩放画布
ruler.allowScale()
</script>
```

## 属性

| 参数 | 说明 | 类型 | 默认值 | 备注
| --- | --- | --- | --- |--- |
| scale	| 画布的缩放比例 | Number | 1| autoScale为true时，scale初始值不生效 |
| minScale	| 画布缩放比例最小值 | Number | 0.1 ||
| maxScale	| 画布缩放比例最大值 | Number | 10 ||
| autoScale	| 初始化时是否自动计算画布缩放比例 | Boolean | true ||
| canScale	| 是否允许缩放 | Boolean | true ||
| autoCenter	| 初始化时是是否自动居中 | Boolean | true ||
| containerAutoSize	| 是否自动计算容器的宽高 | Boolean | true |为true会监控container宽高变化并重新绘制画布和标尺|
| containerWidth	| 容器宽度 | Number | 1000 |containerAutoSize为true时该值不生效|
| containerHeight	| 容器高度 | Number | 500 |containerAutoSize为true时该值不生效|
| containerXPadding	| x方向/水平方向容器与画布之间的左右间距 | Number | 80 ||
| containerYPadding	| y方向/垂直方向容器与画布之间的上下间距 | Number | 80 ||
| canvasWidth	| 画布宽度 | Number | 1920 ||
| canvasHeight	| 画布高度 | Number | 1000 ||
| canvasStyle	| 画布样式 | Object | {} ||
| proxyScaleKey	| 是否代理快捷键缩放 | Boolean | true |代理ctrl+ "+" 和 ctrl + "-"，可以放大、缩小画布|
| useScrollBar	| 是否使用滚动条 | Boolean | true ||
| scrollBarConfig	| 滚动条配置 | Object | {} | see scrollBarConfig params|
| useRuler	| 是否使用标尺 | Boolean | true ||
| rulerConfig	| 标尺配置 | Object | {} |see rulerConfig params|
| usePositionLine	| 是否使用定位线 | Boolean | true ||
| positionLineConfig	| 定位线配置 | Object | {} |see positionLineConfig params|



### scrollBarConfig 参数

| 参数 | 说明 | 类型 | 默认值 | 备注
| --- | --- | --- | --- |--- |
| bgColor	| 背景色 | String | #000000| |
| opacity	| 透明度 | Number | 0.4| |
| zIndex	| 滚动条堆叠顺序 | Number | 500| |
| size	| 水平滚动条的高度或垂直滚动条的宽度 | Number | 8| |

### rulerConfig 参数

| 参数 | 说明 | 类型 | 默认值 | 备注
| --- | --- | --- | --- |--- |
| xRulerHeight	| x/水平标尺的高度 | Number | 30|不要超过containerYPadding |
| yRulerWidth	| y/垂直标尺的宽度 | Number | 30|不要超过containerXPadding |
| bgColor	| 背景色 | String | #efefef| |
| fontColor	| 标尺数值的颜色 | String | #000000| |
| fontSize	| 标尺数值的字体大小 | Number | 12| |
| fontFamily	| 标尺数值的字体 |String | Arial| |
| lineColor	| 标尺刻度颜色 |String | #000000| |
| zIndex	| 标尺堆叠顺序 | Number | 400| |

### positionLineConfig 参数

| 参数 | 说明 | 类型 | 默认值 | 备注
| --- | --- | --- | --- |--- |
| lineColor	| 定位线的颜色 | String | #24aa61| |
| padding	| 定位线操作上下间距 | Number | 3| |
| adsorptionXList	| x/水平方向吸附线 |Array<Number> | [0, canvasWidth]| |
| adsorptionYList	| y/垂直方向吸附线 |Array<Number> | [0, canvasHeight]| |
| adsorptionGap	| 吸附距离 | Number | 4| |
| zIndex	| 堆叠顺序 | Number | 300| |


## 事件

| 事件名 | 说明 | 回调参数
| --- | --- | --- |
| onScale	| 缩放画布时触发的事件 | scale: number | 
| onMove	| 移动画布时触发的事件 | translateX: number, translateY: number |
| adsorptionLineChange	| 吸附线变化时触发的事件 | value: number[], isY: boolean|
| positionLineChange	| 定位线变化时触发的事件 | value: number[], isY: boolean|


## 方法

| 方法名	 | 说明 | 参数
| --- | --- | --- |
| reset	| 还原画布 | - | 
| changeScale	| 改变缩放比例 | (scale:number 缩放比例) | 
| removeAllPositionLine	| 删除所有定位线 | - | 
| showRuler	| 显示标尺 | - | 
| hideRuler	| 隐藏标尺 | - | 
| showAllPositionLine	| 显示所有定位线 | - | 
| hideAllPositionLine	| 隐藏所有定位线 | - | 
| addAdsorptionLine	| 增加吸附线 | (data: number \| Array<number>- 吸附线的值，可为数组或数值, isY: boolean 是否为y/垂直方向吸附线) | 
| removeAdsorptionLine	| 删除吸附线 | (data: number \| Array<number>- 吸附线的值，可为数组或数值, isY: boolean 是否为y/垂直方向吸附线) | 
| forbidScale	| 禁止缩放画布 | - | 
| allowScale	| 允许缩放画布 | - | 
| getCanvasEl	| 获取画布元素 | - | 



