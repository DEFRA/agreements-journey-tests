import { Page } from './page.js'

class ViewAgreementPage extends Page {
  async getHeading() {
    return await $('h1.govuk-heading-xl').getText()
  }

  async getAgreementHolder() {
    return await $('dl.dataset-info dt:nth-of-type(1)').getText()
  }

  async getSBIValue() {
    return await $('dl.dataset-info dt:nth-of-type(2)').getText()
  }

  async getAddress() {
    return await $('dl.dataset-info dt:nth-of-type(3)').getText()
  }

  async getAgreementName() {
    return await $('dl.dataset-info dt:nth-of-type(4)').getText()
  }

  async getAgreementNumber() {
    return await $('dl.dataset-info dt:nth-of-type(5)').getText()
  }

  async getStartDate() {
    return await $('dl.dataset-info dt:nth-of-type(6)').getText()
  }

  // Sub-headers
  get introSubHeader() {
    return $('#intro')
  }

  get partiesSubHeader() {
    return $('#parties')
  }

  get landSubHeader() {
    return $('#land')
  }

  get actionsSubHeader() {
    return $('#actions')
  }

  get paymentSubHeader() {
    return $('#payment')
  }

  get scheduleSubHeader() {
    return $('#schedule')
  }

  get protectionSubHeader() {
    return $('#protection')
  }

  getParcelRow(parcelNumber) {
    return $(
      `//*[contains(@class, 'govuk-table')]//tr[td[contains(text(), '${parcelNumber}')]]`
    )
  }

  // Gets the cell with area (2nd column) for a parcel
  async getParcelArea(parcelNumber) {
    const row = await this.getParcelRow(parcelNumber)
    return row.$('td:nth-of-type(2)')
  }

  getParcelActionRow(parcelNumber) {
    return $(
      `//table[contains(@class, 'govuk-table')]//tr[td[1][normalize-space(text())='${parcelNumber}']]`
    )
  }

  async getParcelActionCell(parcelNumber, columnIndex) {
    const row = await this.getParcelActionRow(parcelNumber)
    return row.$(`td:nth-of-type(${columnIndex})`)
  }
}

export { ViewAgreementPage }
