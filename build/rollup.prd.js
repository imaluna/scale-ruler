import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import terser from '@rollup/plugin-terser';
import baseConfig from './baseConfig.js';

const plugins = [
  eslint(),
  resolve(), // 解析 node_modules
  commonjs(), // 转换 CommonJS 为 ES 模块
  babel(baseConfig.babelConfig)
];
export default [
  {
    input: baseConfig.entry,
    output: [
      {
        file: 'lib/index.js',
        format: 'umd',
        name: baseConfig.name
      },
      {
        dir: 'lib',
        format: 'cjs',
        entryFileNames: 'index.cjs.js',
        sourcemap: false
      },
      {
        dir: 'lib',
        format: 'esm',
        entryFileNames: 'index.esm.js',
        sourcemap: false
      }
    ],
    plugins
  },
  {
    input: baseConfig.entry,
    output: [
      {
        file: 'lib/index.min.js',
        format: 'umd',
        name: baseConfig.name
      },
      {
        dir: 'lib',
        format: 'cjs',
        entryFileNames: 'index.cjs.min.js',
        sourcemap: false
      },
      {
        dir: 'lib',
        format: 'esm',
        entryFileNames: 'index.esm.min.js',
        sourcemap: false
      }
    ],
    plugins: [
      ...plugins,
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          drop_console: true,
          drop_debugger: true
        }
      })
    ]
  }
];
