// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'es' // use es imports with modules (new), not cjs requires (old)
  },
  plugins: [typescript(), nodeResolve()]
};

