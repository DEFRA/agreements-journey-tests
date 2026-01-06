import { Page } from './page.js'
import * as constants from '../support/constants.js'
import { genAuthToken } from '../support/gen-auth-token.js'

class LoginPage extends Page {
  async login(sbi) {
    let path = browser.options.proxy
    const isParallelRun = process.env.PARALLEL_RUN === 'true'

    if (isParallelRun) {
      browser.options.baseUrl = browser.options.unproxiedUrl
      browser.options.proxy = '/'
      const authToken = sbi ? genAuthToken({ sbi }) : ''
      const separator = browser.options.proxy.includes('?') ? '&' : '?'
      path = `${browser.options.proxy}${separator}x-encrypted-auth=${authToken}`
      console.debug(`URL set to: ${browser.options.baseUrl}${path}`)
      this.open(path)
      return
    }

    // Normal username/password login
    console.debug(`URL set to: ${browser.options.baseUrl}${path}`)
    this.open(path)
    const usernameInput = await $('#crn')
    const passwordInput = await $('#password')
    const submitButton = await $('button[type="submit"]')
    await usernameInput.setValue(constants.USERNAME)
    await passwordInput.setValue(constants.PASSWORD)
    await submitButton.click()
  }
}

export { LoginPage }
