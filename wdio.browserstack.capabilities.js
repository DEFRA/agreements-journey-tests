export const browserStackCapabilities = [
  // windows
  {
    browserName: 'Chrome',
    'wdio-ics:options': {
      logName: 'win-chrome'
    },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'Windows',
      osVersion: '11'
    }
  },
  {
    browserName: 'Edge',
    'wdio-ics:options': {
      logName: 'win-edge'
    },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'Windows',
      osVersion: '11'
    }
  },
  {
    browserName: 'Firefox',
    'wdio-ics:options': {
      logName: 'win-firefox'
    },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'Windows',
      osVersion: '11'
    }
  },
  // macOS
  {
    browserName: 'Chrome',
    'wdio-ics:options': {
      logName: 'osx-chrome'
    },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'OS X',
      osVersion: 'Sequoia' // Updated from 'Sonoma'
    }
  },
  {
    browserName: 'Safari',
    'wdio-ics:options': {
      logName: 'osx-safari'
    },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'OS X',
      osVersion: 'Sequoia'
    }
  },
  {
    browserName: 'Firefox',
    'wdio-ics:options': {
      logName: 'osx-firefox'
    },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'OS X',
      osVersion: 'Sequoia'
    }
  },
  // iPhone
  {
    browserName: 'Safari',
    'wdio-ics:options': {
      logName: 'ios-safari'
    },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'iPhone 14',
      osVersion: '16',
      realMobile: true,
      browserVersion: 'latest'
    }
  },
  {
    browserName: 'Chrome',
    'wdio-ics:options': {
      logName: 'ios-chrome'
    },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'iPhone 15',
      osVersion: '16',
      realMobile: true,
      browserVersion: 'latest'
    }
  },
  // Android
  {
    browserName: 'Chrome',
    'wdio-ics:options': {
      logName: 'android-chrome'
    },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'Samsung Galaxy S23',
      osVersion: '13.0',
      realMobile: true,
      browserVersion: 'latest'
    }
  },
  {
    browserName: 'Samsung',
    'wdio-ics:options': {
      logName: 'android-samsung-internet'
    },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'Samsung Galaxy S23',
      osVersion: '13.0',
      realMobile: true,
      browserVersion: 'latest'
    }
  }
]
