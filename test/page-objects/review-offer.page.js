import { Page } from './page.js'

class ReviewOfferPage extends Page {
  open(id) {
    const proxy = `${browser.options.proxy}`
    const path = id ? `/review-offer/${id}` : '/review-offer/SFI123456789'
    return super.open(proxy + path)
  }

  async getActionTableRowData(rowIndex) {
    const action = await $(`#actionTableActionRow${rowIndex}`).getText()
    const code = await $(`#actionTableCodeRow${rowIndex}`).getText()
    const parcel = await $(`#actionTableLandParcelRow${rowIndex}`).getText()
    const quantity = await $(`#actionTableQuantityRow${rowIndex}`).getText()

    console.log(
      `Row ${rowIndex} - Action: ${action}, Code: ${code}, Parcel: ${parcel}, Quantity: ${quantity}`
    )
    return { action, code, parcel, quantity }
  }

  async getPaymentsTableRowData(rowIndex) {
    const action = await $(`#paymentsTableActionRow${rowIndex}`).getText()
    const code = await $(`#paymentsTableCodeRow${rowIndex}`).getText()
    const paymentRate = await $(
      `#paymentsTablePaymentRateForEachYearRow${rowIndex}`
    ).getText()
    const quarterlyPayment = await $(
      `#paymentsTableQuarterlyPaymentRow${rowIndex}`
    ).getText()
    const yearlyPayment = await $(
      `#paymentsTableYearlyPaymentRow${rowIndex}`
    ).getText()

    console.log(
      `Row ${rowIndex} - Action: ${action}, Code: ${code}, Payment Rate: ${paymentRate}, Quarterly: ${quarterlyPayment}, Yearly: ${yearlyPayment}`
    )

    return { action, code, paymentRate, quarterlyPayment, yearlyPayment }
  }

  async getTotalYearlyPayment() {
    return await $(`#paymentsTableTotalYearlyPayment`).getText()
  }

  async getTotalQuarterlyPayment() {
    return await $(`#paymentsTableTotalQuarterlyPayment`).getText()
  }

  async selectContinue(selector) {
    await $('.govuk-button').click()
  }
}

export { ReviewOfferPage }
