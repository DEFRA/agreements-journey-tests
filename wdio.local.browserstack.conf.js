import allure from 'allure-commandline'
import { browserStackCapabilities } from './wdio.browserstack.capabilities.js'
// import { browserStackCapabilities } from './wdio.browserstack.capabilities.all.js'

export const config = {
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  // Local
  // baseUrl: 'http://localhost:3555',
  // testAPIEndPointUrl: 'http://localhost:3555',
  // proxy: '',
  // DEV URL
  baseUrl: `https://grants-ui.${process.env.ENVIRONMENT}.cdp-int.defra.cloud`,
  unproxiedUrl: `https://farming-grants-agreements-ui.${process.env.ENVIRONMENT}.cdp-int.defra.cloud`,
  testAPIEndPointUrl: `https://ephemeral-protected.api.${process.env.ENVIRONMENT}.cdp-int.defra.cloud/farming-grants-agreements-api`,
  proxy: '/agreement',
  // TEST URL
  // baseUrl: 'https://grants-ui.test.cdp-int.defra.cloud',
  // testAPIEndPointUrl:
  //   'https://farming-grants-agreements-api.test.cdp-int.defra.cloud',
  runner: 'local',
  specs: ['./test/specs/*.js'],
  exclude: [],
  maxInstances: 10,
  capabilities: browserStackCapabilities,
  services: [
    [
      'browserstack',
      {
        testObservability: true,
        testObservabilityOptions: {
          user: process.env.BROWSERSTACK_USER,
          key: process.env.BROWSERSTACK_KEY,
          projectName: 'agreements-journey-tests',
          buildName: 'agreements-journey-tests-local'
        },
        acceptInsecureCerts: true,
        forceLocal: true,
        browserstackLocal: true
      }
    ]
  ],
  logLevel: 'info',
  bail: 1,
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results'
      }
    ]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 600000
  },
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    await browser.takeScreenshot()

    if (error) {
      browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}'
      )
    }
  },
  onComplete: function (exitCode, config, capabilities, results) {
    const reportError = new Error('Could not generate Allure report')
    const generation = allure(['generate', 'allure-results', '--clean'])

    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 60000)

      generation.on('exit', function (exitCode) {
        clearTimeout(generationTimeout)

        if (exitCode !== 0) {
          return reject(reportError)
        }

        allure(['open'])
        resolve()
      })
    })
  }
}
