// import { playwrightLauncher } from '@web/test-runner-playwright';

import { importMapsPlugin } from '@web/dev-server-import-maps';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: 'test/**/*.test.js',
  nodeResolve: true,

  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            // mock a dependency
            'package-a': '/mocks/package-a.js',
            // mock a module in your own code
            '/src/logInfo.js': '/mocks/logInfo.js',
          },
        },
      },
    }),
  ],


  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Confgure bare import resolve plugin */
  // nodeResolve: {
  //   exportConditions: ['browser', 'development']
  // },

  /** Amount of browsers to run concurrently */
  // concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  // concurrency: 1,

  /** Browsers to run tests on */
  // browsers: [
  //   playwrightLauncher({ product: 'chromium' }),
  //   playwrightLauncher({ product: 'firefox' }),
  //   playwrightLauncher({ product: 'webkit' }),
  // ],

  // See documentation for all available options
});
