import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import { OfferAcceptedPage } from '../page-objects/offer-accepted.page.js'
import * as constants from '../support/constants.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import { LoginPage } from '../page-objects/login.page.js'

const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()
const loginPage = new LoginPage()

describe('Given the applicant has reviewed the offer', () => {
  describe('When the applicant navigate to “Accept your offer” page', () => {
    let agreementId
    let sbi
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      sbi = agreement.sbi
      console.log(`Created agreement with ID: ${agreementId}`)
      await loginPage.login(agreementId)
      await reviewOfferPage.selectContinue()
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle(constants.ACCEPT_OFFER_TITLE)
    })

    it('Then should show the Farm Details', async () => {
      expect(await reviewOfferPage.getFarmName()).toBe(
        constants.DEFAULT_FARM_NAME
      )
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
      const url = await browser.getUrl()
      expect(url).toContain(`/${agreementId}`)
      expect(await reviewOfferPage.getPageHeader()).toBe(
        constants.REVIEW_OFFER_HEADER
      )
      await reviewOfferPage.selectContinue()
      expect(await acceptYourOfferPage.getPageHeader()).toBe(
        constants.ACCEPT_OFFER_HEADER
      )
    })

    it('should show all bullet confirmation points', async () => {
      const bulletPoints = await acceptYourOfferPage.getConfirmationChecklist()
      expect(bulletPoints.length).toBe(constants.BULLET_POINTS.length)
      expect(bulletPoints).toEqual(constants.BULLET_POINTS)
    })

    it('should display the terms and conditions link correctly', async () => {
      const termsLink = await acceptYourOfferPage.getTermsAndConditionsLink()
      const text = await termsLink.getText()
      expect(text).toContain(constants.TERMS_LINK_TEXT)
      // const href = await termsLink.getAttribute(constants.HREF)
      // const target = await termsLink.getAttribute(constants.TARGET)
      // expect(
      //   href === constants.TERMS_LINK_HREF ||
      //     href.includes('review-accept-offer')
      // ).toBe(true)
      // expect(target).toBe(null)
    })

    it('should display the "Find funding for land or farms" link correctly', async () => {
      const fundingLink = await acceptYourOfferPage.getFundingLink()
      const text = await fundingLink.getText()
      const href = await fundingLink.getAttribute(constants.HREF)
      const target = await fundingLink.getAttribute(constants.TARGET)
      expect(text).toContain(constants.FUNDING_LINK_TEXT)
      expect(href).toBe(constants.FUNDING_LINK_HREF)
      expect(target).toBe('_blank')
    })

    it('should expand the guidance details section', async () => {
      await acceptYourOfferPage.toggleGuidanceDetails()
      const content = await acceptYourOfferPage.getGuidanceDetailsText()
      expect(content).toContain(constants.GUIDANCE_DETAILS_TEXT)
      expect(content).toContain(constants.CONTACT_CENTRE_NUMBER)

      const link = await acceptYourOfferPage.getCallChargesLink()
      const linkText = await link.getText()
      expect(linkText).toContain(constants.CALL_CHARGES_TEXT)
      // const href = await link.getAttribute(constants.HREF)
      // const target = await link.getAttribute(constants.TARGET)
      // expect(
      //   href === constants.CALL_CHARGES_HREF ||
      //     href.includes('review-accept-offer')
      // ).toBe(true)
      // expect(target).toBe(null)
    })

    it('should proceed to Offer Accepted page on submit', async () => {
      await acceptYourOfferPage.selectAcceptOffer()
      const confirmationText = await offerAcceptedPage.getConfirmationText()
      expect(confirmationText).toBe(constants.OFFER_ACCEPTED_TEXT)
    })
  })
})
