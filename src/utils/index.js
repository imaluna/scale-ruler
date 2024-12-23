const getDataType = (data) => {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};
// 是否为对象
export const isObject = (data) => {
  return getDataType(data) === 'object';
};
// 合并
export const deepMerge = (data1, data2) => {
  const data = {};
  for (const i in data1) {
    if (i in data2) {
      if (isObject(data1[i] && isObject(data2[i]))) {
        data[i] = deepMerge(data1[i], data2[i]);
      } else {
        data[i] = data2[i];
      }
    } else {
      data[i] = data1[i];
    }
  }
  for (const i in data2) {
    if (!(i in data1)) {
      data[i] = data2[i];
    }
  }
  return data;
};

export const floor = (num, decimal = 2) => {
  const mul = Math.pow(10, decimal);
  return +(Math.floor(num * mul) / mul).toFixed(decimal);
};
export const toFixed = (num, decimal = 2) => {
  return +num.toFixed(decimal);
};
export const getGridSize = (scale) => {
  if (scale <= 0.25) return 40;
  if (scale <= 0.5) return 20;
  if (scale <= 1) return 10;
  if (scale <= 2) return 5;
  if (scale <= 4) return 2;
  return 1;
};
// 获取元素的offsetTop和offsetLeft
export const getOffset = (node) => {
  const rect = node.getBoundingClientRect();
  const top =
    rect.top + (document.body.scrollTop || document.documentElement.scrollTop);
  const left =
    rect.left +
    (document.body.scrollLeft || document.documentElement.scrollLeft);
  return { top, left };
};
// 设置样式
export const setStyle = (node, styles) => {
  for (const i in styles) {
    node.style[i] = styles[i];
  }
};
// 获取点击target的pageX和pageY
export const getTargetCoordinate = (e) => {
  const pageX =
    e.pageX ||
    (document.body.scrollLeft || document.documentElement.scrollLeft) +
      e.clienntX ||
    0;
  const pageY =
    e.pageY ||
    (document.body.scrollTop || document.documentElement.scrollTop) +
      e.clienntY ||
    0;
  return { pageX, pageY };
};
