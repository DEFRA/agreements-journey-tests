import { Page } from './page.js'

class AgreementsPage extends Page {
  open(id) {
    const path = id ? `/agreement/${id}` : '/agreement/SFI123456789'
    return super.open(path)
  }

  async getSectionText(sectionNumber) {
    return await $(`section:nth-of-type(${sectionNumber}) > h2`).getText()
  }

  async getAgreementKeyDetailValue(label) {
    const valueCell = await $(
      `//table[contains(@class, 'table-details')]//tr[td[1][normalize-space(text())='${label}']]/td[2]`
    )
    return await valueCell.getText()
  }

  async getAgreementPeriodText(label) {
    return await $(
      `//h2[normalize-space()='8. Agreement Period']/following-sibling::p[starts-with(normalize-space(), '${label}:')]`
    ).getText()
  }

  async getAnnualPaymentScheduleTotalRow() {
    const totalRow = await $$(
      '//h2[normalize-space()="7. Annual Payment Schedule"]/following::table[2]//tr[td[1][normalize-space()="Total"]]/td'
    )
    return await totalRow.mapSeries(async (cell) => await cell.getText())
  }

  async acceptAgreement(selector) {
    const button = await $("button[type='submit']")
    await button.click()
  }

  async getAgreementAcceptText(label) {
    return await $(`.govuk-heading-l`).getText()
  }
}
export { AgreementsPage }
