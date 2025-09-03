import { Page } from './page.js'

class AcceptYourOfferPage extends Page {
  async getConfirmationText() {
    return await $(`.govuk-heading-l`).getText()
  }

  async clickBackLink() {
    return await $('a.govuk-back-link').click()
  }

  async selectAcceptOffer(selector) {
    await $('.govuk-button').click()
  }

  async toggleGuidanceDetails() {
    return $('summary=If you need to make an update').click()
  }

  getConfirmationChecklist() {
    return $$('ul.govuk-list--bullet li').map((el) => el.getText())
  }

  async getGuidanceDetailsText() {
    const details = await $('summary=If you need to make an update')
    const parent = await details.parentElement()
    return parent.$('.govuk-details__text').getText()
  }

  async getCallChargesLink() {
    return await this.getLinkByPartialText('Find out about call charges')
  }

  async getTermsAndConditionsLink() {
    return await this.getLinkByPartialText('terms and conditions')
  }

  async getFundingLink() {
    return await this.getLinkByPartialText('Find funding for land or farms')
  }
}
export { AcceptYourOfferPage }
