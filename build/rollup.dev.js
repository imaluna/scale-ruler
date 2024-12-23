import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import baseConfig from './baseConfig.js';
export default {
  input: baseConfig.entry,
  output: {
    file: 'lib/index.js',
    format: 'umd',
    name: baseConfig.name
  },
  plugins: [
    eslint(),
    resolve(), // 解析 node_modules
    commonjs(), // 转换 CommonJS 为 ES 模块
    babel(baseConfig.babelConfig)
  ]
};
