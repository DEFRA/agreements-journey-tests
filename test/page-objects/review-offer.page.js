import path from 'node:path'
import { Page } from './page.js'

class ReviewOfferPage extends Page {
  open() {
    const proxy = `${browser.options.proxy}`
    return super.open(proxy)
  }

  async getActionTableRowData(rowIndex) {
    const row = await $(`[data-test-id="actionsTableRow${rowIndex}"]`)

    const action = await row.$('[data-test-id="actionsTableCell1_0"]').getText()

    const code = await row.$('[data-test-id="actionsTableCell2_1"]').getText()

    const parcel = await row.$('[data-test-id="actionsTableCell3_2"]').getText()

    const quantity = await row
      .$('[data-test-id="actionsTableCell4_3"]')
      .getText()

    const duration = await row
      .$('[data-test-id="actionsTableCell5_4"]')
      .getText()

    console.log(
      `Row ${rowIndex} - Action: ${action}, Code: ${code}, Parcel: ${parcel}, Quantity: ${quantity}, Duration: ${duration}`
    )

    return { action, code, parcel, quantity, duration }
  }

  async getPaymentsTableRowData(rowIndex) {
    const row = await $(`[data-test-id="paymentsTableRow${rowIndex}"]`)

    const action = await row
      .$('[data-test-id="paymentsTableCell1_0"]')
      .getText()

    const code = await row.$('[data-test-id="paymentsTableCell2_1"]').getText()

    const paymentRate = await row
      .$('[data-test-id="paymentsTableCell3_2"]')
      .getText()

    const firstPayment = await row
      .$('[data-test-id="paymentsTableCell4_3"]')
      .getText()

    const subsequentPayments = await row
      .$('[data-test-id="paymentsTableCell5_4"]')
      .getText()

    const yearlyPayment = await row
      .$('[data-test-id="paymentsTableCell6_5"]')
      .getText()

    console.log(
      `Row ${rowIndex} - Action: ${action}, Code: ${code}, Payment Rate: ${paymentRate}, First Payment: ${firstPayment}, Subsequent Payments: ${subsequentPayments}, Yearly: ${yearlyPayment}`
    )

    return {
      action,
      code,
      paymentRate,
      firstPayment,
      subsequentPayments,
      yearlyPayment
    }
  }

  async getTotalFirstPayment() {
    const totalRow = await $('[data-test-id="paymentsTableRow6"]')
    return await totalRow.$('[data-test-id="paymentsTableCell4_3"]').getText()
  }

  async getTotalSubsequentPayment() {
    const totalRow = await $('[data-test-id="paymentsTableRow6"]')
    return await totalRow.$('[data-test-id="paymentsTableCell5_4"]').getText()
  }

  async getTotalYearlyPayment() {
    const totalRow = await $('[data-test-id="paymentsTableRow6"]')
    return await totalRow.$('[data-test-id="paymentsTableCell6_5"]').getText()
  }

  async selectContinue(selector) {
    const button = await $('button[value="display-accept"]')
    await button.click()
  }

  async checkPostcodePresent() {
    const text = await $('body').getText()
    return text.includes('DY14 0UY')
  }

  async getTermsAndConditionsLink() {
    return await this.getLinkByPartialText(
      'Farm payments technical test terms and conditions'
    )
  }

  async getTechnicalTestInfoLink() {
    return await this.getLinkByPartialText(
      'Farm payments technical test information'
    )
  }

  async getTechnicalTestActionsLink() {
    return await this.getLinkByPartialText(
      'Farm payments technical test actions'
    )
  }

  async getDraftAgreementLink() {
    return await this.getLinkByPartialText(
      'View a printable version of your draft agreement (opens in new tab)'
    )
  }

  async clickPrintableAgreementLinkAndSwitchTab() {
    const link = await $(
      `a[href*="${path.join('/', browser.options.proxy, '/')}"][href*="/print"]`
    )
    await link.click()

    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[handles.length - 1])
  }
}

export { ReviewOfferPage }
