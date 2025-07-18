import { Page } from './page.js'

class ReviewOfferPage extends Page {
  open(id) {
    const path = id ? `/review-offer/${id}` : '/review-offer/SFI123456789'
    return super.open(path)
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
    const button = await $("button[type='submit']")
    await button.click()
  }
}
export { ReviewOfferPage }
