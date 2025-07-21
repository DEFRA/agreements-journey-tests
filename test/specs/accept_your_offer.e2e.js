import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from 'page-objects/accept-your-offer.page.js'
import { OfferAcceptedPage } from 'page-objects/offer-accepted.page.js'
import { unacceptAgreement } from '../services/unaccept-agreement.js'
import * as constants from '../utils/constants.js'

const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()

describe('Given the applicant has reviewed the offer', () => {
  describe('When the applicant navigate to “Accept your offer” page', () => {
    before(async () => {
      try {
        await unacceptAgreement(constants.DEFAULT_AGREEMENT_ID)
      } catch (e) {
        console.warn('making sure agreement is setup for use')
      }
      await reviewOfferPage.open(constants.DEFAULT_AGREEMENT_ID)
      await reviewOfferPage.selectContinue()
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle(constants.ACCEPT_OFFER_TITLE)
    })

    it('Then should show the Farm Details', async () => {
      expect(await acceptYourOfferPage.getFarmName()).toBe(constants.FARM_NAME)
      expect(await acceptYourOfferPage.getSBI()).toBe(constants.SBI)
      expect(await acceptYourOfferPage.getFarmerName()).toBe(
        constants.FARMER_NAME
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
      expect(url).toContain(`/review-offer/${constants.DEFAULT_AGREEMENT_ID}`)
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

    it.skip('should proceed to Offer Accepted page on submit', async () => {
      await acceptYourOfferPage.selectAcceptOffer()
      const confirmationText = await offerAcceptedPage.getConfirmationText()
      expect(confirmationText).toBe(constants.OFFER_ACCEPTED_TEXT)
    })
  })
})
