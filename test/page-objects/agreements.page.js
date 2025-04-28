import { Page } from 'page-objects/page'

class AgreementsPage extends Page {
  open() {
    return super.open('/agreement/SFI123456789')
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
}
export default new AgreementsPage()
