import { Page } from './page.js'
import * as constants from '../support/constants.js'

class LoginPage extends Page {
  async login(id) {
    const proxy = `${browser.options.proxy}`
    const path = id ? `/${id}` : '/SFI123456789'
    this.open(proxy + path)
    const usernameInput = await $('#crn')
    const passwordInput = await $('#password')
    const submitButton = await $('button[type="submit"]')

    await usernameInput.setValue(constants.USERNAME)
    await passwordInput.setValue(constants.PASSWORD)
    await submitButton.click()
  }
}

export { LoginPage }
