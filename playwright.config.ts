import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  timeout: 50000,
  // globalTimeout: 60000,

  retries: 1,
  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    // ['allure-playwright']
  ],

  use: {
    baseURL: 'http://localhost:4200/',

    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 20000,
    screenshot: 'on',
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    }
  },

  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/'
      },
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      }
    },
  ],

//   webServer: {
//     command: 'npm run start',
//     url: 'http://localhost:4200/',
//   //   reuseExistingServer: !process.env.CI,
//   },
});
