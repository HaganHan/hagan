import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/hagan.min.js',
        format: 'umd',
        name: 'hagan'
      }
    ],
    plugins: [
      resolve(),
      babel({ babelHelpers: 'bundled' }),
      uglify()
    ]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/hagan.js',
        format: 'umd',
        name: 'hagan'
      }
    ],
    plugins: [
      resolve()
    ]
  }
]
