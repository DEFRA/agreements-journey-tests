import { Page } from './page.js'

class ReviewOfferPage extends Page {
  open() {
    const proxy = `${browser.options.proxy}`
    return super.open(proxy)
  }

  async getActionTableRowData(rowIndex) {
    const action = await $(`#actionTableActionRow${rowIndex}`).getText()
    const code = await $(`#actionTableCodeRow${rowIndex}`).getText()
    const parcel = await $(`#actionTableLandParcelRow${rowIndex}`).getText()
    const quantity = await $(`#actionTableQuantityRow${rowIndex}`).getText()
    const duration = await $(`#actionTableDurationRow${rowIndex}`).getText()

    console.log(
      `Row ${rowIndex} - Action: ${action}, Code: ${code}, Parcel: ${parcel}, Quantity: ${quantity} , Duration: ${duration}`
    )
    return { action, code, parcel, quantity, duration }
  }

  async getPaymentsTableRowData(rowIndex) {
    const action = await $(`#paymentsTableActionRow${rowIndex}`).getText()
    const code = await $(`#paymentsTableCodeRow${rowIndex}`).getText()
    const paymentRate = await $(
      `#paymentsTablePaymentRateForEachYearRow${rowIndex}`
    ).getText()
    const firstPayment = await $(
      `#paymentsTableFirstPaymentRow${rowIndex}`
    ).getText()
    const subsequentPayments = await $(
      `#paymentsTableSubsequentPaymentRow${rowIndex}`
    ).getText()
    const yearlyPayment = await $(
      `#paymentsTableYearlyPaymentRow${rowIndex}`
    ).getText()

    console.log(
      `Row ${rowIndex} - Action: ${action}, Code: ${code}, Payment Rate: ${paymentRate}, First Payment: ${firstPayment},Subsequent payments : ${subsequentPayments}, Yearly: ${yearlyPayment}`
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
    return await $(`#paymentsTableTotalFirstPayment`).getText()
  }

  async getTotalSubsequentPayment() {
    return await $(`#paymentsTableTotalSubsequentPayment`).getText()
  }

  async getTotalYearlyPayment() {
    return await $(`#paymentsTableTotalYearlyPayment`).getText()
  }

  async selectContinue(selector) {
    const button = await $('button[value="display-accept"]')
    await button.click()
  }
}

export { ReviewOfferPage }
