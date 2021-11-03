import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'es'
      }
    ],
    plugins: [typescript({ declaration: true, declarationDir: 'dist' })]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/index.browser.js',
        format: 'iife',
        name: 'fetchPro'
      }
    ],
    plugins: [typescript()]
  }
];
