import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

export default {
  input: 'extensions/shipping-info-banner/src/index.tsx',
  output: {
    file: 'dist/extensions/shipping-info-banner.js',
    format: 'iife',
    name: 'ShippingInfoBanner',
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
    }),
    terser(),
  ],
}
