import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import { getAgreement } from '../services/get-agreement.js'
import { LoginPage } from '../page-objects/login.page.js'
import { OfferAcceptedPage } from '../page-objects/offer-accepted.page.js'
import * as constants from '../support/constants.js'
import { ViewAgreementPage } from '../page-objects/view-agreement.page.js'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()
const loginPage = new LoginPage()
const viewAgreementPage = new ViewAgreementPage()

describe('Browser Compatability: Given the applicant has applied and received the offer ', () => {
  describe('When the applicant lands on agreement page', () => {
    let agreementId
    let sbi
    let agreementData
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      agreementData = await getAgreement(agreementId)
      sbi = agreementData.identifiers.sbi
      console.log(`Created offer with ID: ${agreementId} , SBI :${sbi}`)
    })

    it('Then should be able to accept the agreement', async () => {
      await loginPage.login(sbi)
      await reviewOfferPage.selectContinue()
      await acceptYourOfferPage.clickConfirmCheckbox()
      await acceptYourOfferPage.selectAcceptOffer()
      await expect(browser).toHaveTitle(constants.OFFER_ACCEPTED_TITLE)
      await offerAcceptedPage.clickAgreementDocumentLink()
      expect(await viewAgreementPage.getAgreementNumber()).toBe(agreementId)
    })
  })
})
