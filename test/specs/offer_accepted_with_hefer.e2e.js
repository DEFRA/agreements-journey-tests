import { expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import { OfferAcceptedPage } from '../page-objects/offer-accepted.page.js'
import * as constants from '../support/constants.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import { getAgreement } from '../services/get-agreement.js'
import { LoginPage } from '../page-objects/login.page.js'
import heferOffer from '../data/hefer_create_offer.json'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()
const loginPage = new LoginPage()

describe('HEFER Given the applicant has the offer ', () => {
  describe('When the applicant views “Offer accepted” page', () => {
    it('Then should show HEFER consent', async () => {
      const agreement = await createTestAgreement(heferOffer)
      const agreementId = agreement.agreementId
      const agreementData = await getAgreement(agreementId)
      const sbi = agreement.sbi
      console.log(`Created offer with ID: ${agreementId}`)
      console.log('agreementData:', JSON.stringify(agreementData, null, 2))
      await loginPage.login(sbi)
      await reviewOfferPage.selectContinue()
      await acceptYourOfferPage.clickConfirmCheckbox()
      await acceptYourOfferPage.selectAcceptOffer()
      const heading = await offerAcceptedPage.getSectionHeading(
        constants.HEFER_ONLY_HEADING
      )
      await expect(heading).toBeDisplayed()
      const bodyText = await offerAcceptedPage.getInstructionPanelText()
      expect(bodyText).toContain(constants.HEFER_ONLY_BODY)
      const link = await offerAcceptedPage.getHeferGuidanceLink()
      expect(await link.getText()).toContain(constants.HEFER_ONLY_LINK)
    })
  })
})
