import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import { OfferAcceptedPage } from '../page-objects/offer-accepted.page.js'
import * as constants from '../support/constants.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import { genAuthHeader } from '../support/gen-auth-header.js'

const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()

describe('Given the applicant has reviewed the offer', () => {
  describe('When the applicant navigate to "Accept your offer" page', () => {
    let agreementId
    let sbi
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      sbi = agreement.sbi
      console.log(`Created agreement with ID: ${agreementId}`)

      const headers = genAuthHeader({ sbi })
      await browser.cdp('Network', 'setExtraHTTPHeaders', { headers })

      await reviewOfferPage.open()
      await reviewOfferPage.selectContinue()
    })

    it('Then should show Beta phase banner', async () => {
      expect(await acceptYourOfferPage.isBetaBannerPresent()).toBe(true)
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle(constants.ACCEPT_OFFER_TITLE)
    })

    it('Then should show the Farm Details', async () => {
      const text = await reviewOfferPage.getFarmName()
      expect(text).toContain(constants.DEFAULT_FARM_NAME)
      expect(await reviewOfferPage.getSBI()).toBe(sbi)
      expect(await reviewOfferPage.getFarmerName()).toBe(
        constants.DEFAULT_FARMER_NAME
      )
    })

    it('Then should show Header', async () => {
      expect(await acceptYourOfferPage.getPageHeader()).toBe(
        constants.ACCEPT_OFFER_HEADER
      )
    })

    it('should return to the Review Offer page when clicking Back', async () => {
      await acceptYourOfferPage.clickBackLink()
      expect(await reviewOfferPage.getPageHeader()).toBe(
        constants.REVIEW_OFFER_HEADER
      )
      await reviewOfferPage.selectContinue()
      expect(await acceptYourOfferPage.getPageHeader()).toBe(
        constants.ACCEPT_OFFER_HEADER
      )
    })

    it('should display the terms and conditions link correctly', async () => {
      const termsLink = await acceptYourOfferPage.getTermsAndConditionsLink()
      const text = await termsLink.getText()
      expect(text).toContain(constants.TERMS_LINK_TEXT)
    })

    it('should expand the guidance details section', async () => {
      await acceptYourOfferPage.toggleGuidanceDetails()
      const content = await acceptYourOfferPage.getGuidanceDetailsText()
      expect(content).toContain(constants.GUIDANCE_DETAILS_TEXT)
      expect(content).toContain(constants.CONTACT_CENTRE_NUMBER)
      expect(content).toContain(constants.CONTACT_CENTRE_EMAIL)

      const link = await acceptYourOfferPage.getCallChargesLink()
      const linkText = await link.getText()
      expect(linkText).toContain(constants.CALL_CHARGES_TEXT)
    })

    it('should proceed to Offer Accepted page on submit', async () => {
      await acceptYourOfferPage.clickConfirmCheckbox()
      await acceptYourOfferPage.selectAcceptOffer()
      const confirmationText = await offerAcceptedPage.getConfirmationText()
      expect(confirmationText).toBe(constants.OFFER_ACCEPTED_TEXT)
    })
  })
})
