import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import replace from '@rollup/plugin-replace';

const pkg = require('./package.json');

const isDevelopment = (
  process.env.ROLLUP_WATCH === 'true'
  || process.env.NODE_ENV === 'development'
);

const input = './src/index.ts';

const plugins = [
  typescript({
    typescript: require('typescript'),
  }),
  nodeResolve(),
  commonjs({
    sourceMap: true,
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(
      isDevelopment ? 'development' : 'production'
    ),
  }),
];

if (!isDevelopment) {
  // terser is slow, only run when building
  plugins.push(terser());
}

const config = {
  input,
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true,
    exports: 'default',
  },
  plugins,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
    // ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies),
    'crypto',
    'buffer',
    'tslib',
  ],
};

if (isDevelopment) {
  config.watch = {
    chokidar: {
      paths: 'src/**',
      useFsEvents: false,
    }
  };
}

export default config;
