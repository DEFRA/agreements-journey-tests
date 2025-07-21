import { browser, $ } from '@wdio/globals'

class Page {
  get pageHeading() {
    return $('h1')
  }

  open(path) {
    return browser.url(path)
  }

  async getFarmName() {
    return await $(`#farmName`).getText()
  }

  async getSBI() {
    return await $(`#sbi`).getText()
  }

  async getFarmerName() {
    return await $(`#farmerName`).getText()
  }

  async getPageHeader() {
    return await $(`.govuk-heading-xl`).getText()
  }

  async getLinkByPartialText(partialText) {
    const links = await $$('a.govuk-link')
    for (const link of links) {
      if (
        (await link.getText()).toLowerCase().includes(partialText.toLowerCase())
      ) {
        return link
      }
    }
    throw new Error(`Link containing "${partialText}" not found`)
  }
}

export { Page }
