import { Page } from './page.js'

class OfferAcceptedPage extends Page {
  async getConfirmationText() {
    return await $(`.govuk-heading-l`).getText()
  }
}
export { OfferAcceptedPage }
