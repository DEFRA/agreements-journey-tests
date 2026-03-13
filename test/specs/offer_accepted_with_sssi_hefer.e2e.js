import { expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import { OfferAcceptedPage } from '../page-objects/offer-accepted.page.js'
import * as constants from '../support/constants.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import { getAgreement } from '../services/get-agreement.js'
import { LoginPage } from '../page-objects/login.page.js'
import sssiHeferOffer from '../data/sssi_hefer_create_offer.json'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()
const loginPage = new LoginPage()

describe('SSSI and HEFER Given the applicant has the offer ', () => {
  describe('When the applicant views “Offer accepted” page', () => {
    it('Then should show SSI and HEFER consent', async () => {
      const agreement = await createTestAgreement(sssiHeferOffer)
      const agreementId = agreement.agreementId
      const agreementData = await getAgreement(agreementId)
      const sbi = agreement.sbi
      console.log(`Created offer with ID: ${agreementId}`)
      console.log('agreementData:', JSON.stringify(agreementData, null, 2))
      await loginPage.login(sbi)
      await reviewOfferPage.selectContinue()
      await acceptYourOfferPage.clickConfirmCheckbox()
      await acceptYourOfferPage.selectAcceptOffer()
      const text = await offerAcceptedPage.getFarmName()
      expect(text).toContain(constants.DEFAULT_FARM_NAME)
      const heading = await offerAcceptedPage.getSectionHeading(
        constants.SSSI_HEFER_COMBINED_HEADING
      )
      await expect(heading).toBeDisplayed()
      const bodyText = await offerAcceptedPage.getInstructionPanelText()
      expect(bodyText).toContain(constants.SSSI_HEFER_COMBINED_BODY)
      const sssiLink = await offerAcceptedPage.getSssiGuidanceLink()
      expect(await sssiLink.getText()).toContain(
        constants.SSSI_CONSENT_LINK_TEXT
      )
      const heferLink = await offerAcceptedPage.getHeferGuidanceLinkwithSSI()
      expect(await heferLink.getText()).toContain(constants.HEFER_LINK_TEXT)
    })
  })
})
