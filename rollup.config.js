import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';

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
    sourceMap: false,
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(
      isDevelopment ? 'development' : 'production'
    ),
    preventAssignment: false,
  }),
  json(),
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
    sourcemap: false,
    exports: 'default',
  },
  plugins,
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
