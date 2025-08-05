import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';

export default defineNitroConfig({
  compatibilityDate: '2025-07-30',
  preset: 'cloudflare_pages',
  srcDir: '.vitepress',
  routeRules: {
    '/api/**': { cors: false },
  },
  rollupConfig: {
    external: ['@resvg/resvg-wasm/index_bg.wasm', './index_bg.wasm?module'],
    plugins: [
      copy({
        targets: [
          {
            src: './node_modules/@resvg/resvg-wasm/index_bg.wasm',
            dest: './.output/public',
          },
        ],
      }),
      replace({
        include: ['./**/*.ts'],
        '/* WASM_IMPORT */': 'import resvg_wasm from "./index_bg.wasm?module";',
        delimiters: ['', ''],
        preventAssignment: false,
      }),
    ],
  },
  esbuild: {
    options: {
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    },
  },
});
