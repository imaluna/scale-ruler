import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
// import { terser } from 'rollup-plugin-terser';
import eslint from '@rollup/plugin-eslint';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'ScaleRuler'
  },
  plugins: [
    // todo
    eslint(),
    resolve(), // 解析 node_modules
    commonjs(), // 转换 CommonJS 为 ES 模块
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })
  ]
};
