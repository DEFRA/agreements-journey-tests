import { expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import { OfferAcceptedPage } from '../page-objects/offer-accepted.page.js'
import { getAgreement } from '../services/get-agreement.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import * as constants from '../support/constants.js'
import { LoginPage } from '../page-objects/login.page.js'
import { unacceptAgreement } from '~/test/services/unaccept-agreement.js'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()
const loginPage = new LoginPage()

describe('E2E: Create, Accept,Un-accept and validate agreement', () => {
  let agreementId
  before(async () => {
    // Step 1: Create agreement
    const agreement = await createTestAgreement()
    agreementId = agreement.agreementId
    console.log(`Created agreement with ID: ${agreementId}`)
    await loginPage.login()
  })

  it('should accept the agreement', async () => {
    await reviewOfferPage.selectContinue()
    await acceptYourOfferPage.clickConfirmCheckbox()
    await acceptYourOfferPage.selectAcceptOffer()
    const confirmationText = await offerAcceptedPage.getConfirmationText()
    expect(confirmationText).toBe('Agreement offer accepted')
  })

  it('should validate agreement is accepted along with invoice details via API', async () => {
    console.log(`agreement accepted: ${agreementId}`)
    const agreementData = await getAgreement(agreementId)
    console.debug(
      'agreementData after accept:-----',
      JSON.stringify(agreementData, null, 2)
    )
    expect(agreementData).not.toBeUndefined()
    expect(agreementData.status).toBe('accepted')
    expect(agreementData.invoice).toBeDefined()
    expect(agreementData.invoice[0].invoiceNumber).toBeDefined()
  })

  /*
    Un accept and re-acceptance not part of scope will be revisited
   */
  it('should un-accept the agreement and validate via API', async () => {
    await unacceptAgreement(agreementId)
    const agreementData = await getAgreement(agreementId)
    console.log(
      'agreementData after unaccept:-----',
      JSON.stringify(agreementData, null, 2)
    )
    expect(agreementData.status).toBe('offered')
  })

  it('re-acceptance of agreement and validate via API', async () => {
    await reviewOfferPage.open()
    await reviewOfferPage.selectContinue()
    await acceptYourOfferPage.clickConfirmCheckbox()
    await acceptYourOfferPage.selectAcceptOffer()
    expect(await offerAcceptedPage.getConfirmationText()).toBe(
      constants.OFFER_ACCEPTED_HEADER
    )
    const agreementData = await getAgreement(agreementId)
    console.debug(
      'agreementData after accept:-----',
      JSON.stringify(agreementData, null, 2)
    )
    expect(agreementData).not.toBeUndefined()
    expect(agreementData.status).toBe('accepted')
    expect(agreementData.invoice).toBeDefined()
    expect(agreementData.invoice[0].invoiceNumber).toBeDefined()
  })
})
