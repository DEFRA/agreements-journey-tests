import fs from 'node:fs'
import { browserStackCapabilities } from './wdio.browserstack.capabilities.js'

const oneMinute = 60 * 1000

export const config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  runner: 'local',
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: `https://grants-ui.${process.env.ENVIRONMENT}.cdp-int.defra.cloud`,
  testAPIEndPointUrl: `https://farming-grants-agreements-api.${process.env.ENVIRONMENT}.cdp-int.defra.cloud`,
  proxy: '/agreement',
  // You will need to provide your own BrowserStack credentials.
  // These should be added as secrets to the test suite.
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,

  // Tests to run
  specs: ['./test/specs/**/*.js'],
  // Tests to exclude
  exclude: [],
  maxInstances: 1,
  commonCapabilities: {
    'bstack:options': {
      buildName: `agreements-journey-tests-${process.env.ENVIRONMENT}` // configure as required
    }
  },

  capabilities: browserStackCapabilities,

  services: [
    [
      'browserstack',
      {
        testObservability: true, // Disable if you do not want to use the browserstack test observer functionality
        testObservabilityOptions: {
          user: process.env.BROWSERSTACK_USER,
          key: process.env.BROWSERSTACK_KEY,
          projectName: 'agreements-journey-tests', // should match project in browserstack
          buildName: `agreements-journey-tests-${process.env.ENVIRONMENT}`
        },
        acceptInsecureCerts: true,
        forceLocal: false,
        browserstackLocal: true,
        opts: {
          proxyHost: 'localhost',
          proxyPort: 3128
        }
      }
    ]
  ],

  execArgv: ['--loader', 'esm-module-alias/loader'],

  logLevel: 'info',

  // Number of failures before the test suite bails.
  bail: 0,
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',

  reporters: [
    [
      // Spec reporter provides rolling output to the logger so you can see it in-progress
      'spec',
      {
        addConsoleLogs: true,
        realtimeReporting: true,
        color: false
      }
    ],
    [
      // Allure is used to generate the final HTML report
      'allure',
      {
        outputDir: 'allure-results'
      }
    ]
  ],

  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: oneMinute * 10
  },

  // Hooks
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (error) {
      await browser.takeScreenshot()
    }
  },

  beforeSession: function (config, capabilities) {
    capabilities['bstack:options'].sessionName =
      `Run - ${capabilities['wdio-ics:options'].logName}`
  },

  onComplete: function (exitCode, config, capabilities, results) {
    // !Do Not Remove! Required for test status to show correctly in portal.
    if (results?.failed && results.failed > 0) {
      fs.writeFileSync('FAILED', JSON.stringify(results))
    }
  }
}
