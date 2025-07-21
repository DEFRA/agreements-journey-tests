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
    return $('#update-guidance-details summary').click()
  }

  getConfirmationChecklist() {
    return $$('ul.govuk-list--bullet > li').map((el) => el.getText())
  }

  async getGuidanceDetailsText() {
    return $('#update-guidance-details .govuk-details__text').getText()
  }

  async getCallChargesLink() {
    return this.getLinkByPartialText('Find out about call charges')
  }

  async getTermsAndConditionsLink() {
    return this.getLinkByPartialText('terms and conditions')
  }

  async getFundingLink() {
    return this.getLinkByPartialText('Find funding for land or farms')
  }
}
export { AcceptYourOfferPage }
