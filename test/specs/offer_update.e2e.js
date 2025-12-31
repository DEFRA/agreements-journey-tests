import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import * as constants from '../support/constants.js'
import {
  createTestAgreement,
  updateTestAgreement
} from '../support/agreement-helper.js'
import { getAgreement } from '../services/get-agreement.js'
import { genAuthHeader } from '../support/gen-auth-header.js'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()

describe('Given the applicant has asked for changes to the offer ', () => {
  describe('When the applicant views “Offer review” page for offer update', () => {
    let agreementId
    let frn
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      await getAgreement(agreementId)
      frn = agreement.frn
      const sbi = agreement.sbi
      await updateTestAgreement(frn)
      console.log(`Created offer with ID: ${agreementId}`)

      const headers = genAuthHeader({ sbi })
      await browser.cdp('Network', 'setExtraHTTPHeaders', { headers })

      await reviewOfferPage.open()
    })

    it('Then should see the new version and is able to accept the agreement', async () => {
      await reviewOfferPage.checkPostcodePresent()
      await reviewOfferPage.selectContinue()
      await acceptYourOfferPage.clickConfirmCheckbox()
      await acceptYourOfferPage.selectAcceptOffer()
      await expect(browser).toHaveTitle(constants.OFFER_ACCEPTED_TITLE)
    })
  })
})
