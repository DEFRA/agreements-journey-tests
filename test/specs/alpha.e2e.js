import { expect } from '@wdio/globals'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from 'page-objects/accept-your-offer.page.js'
import { OfferAcceptedPage } from 'page-objects/offer-accepted.page.js'
import { getAgreement } from '../services/get-agreement.js'
import { unacceptAgreement } from '../services/unaccept-agreement.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import * as constants from '../support/constants.js'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()

describe('E2E: Create, Accept,Un-accept and validate agreement', () => {
  let agreementId, sbi
  before(async () => {
    // Step 1: Create agreement
    const agreement = await createTestAgreement()
    agreementId = agreement.agreementId
    sbi = agreement.sbi
    console.log(`Created agreement with ID: ${agreementId}`)
    const currentUrl = await browser.getUrl()
    console.log('Current URL:', currentUrl)
    await reviewOfferPage.open(agreementId)
  })

  it('should accept the agreement', async () => {
    await reviewOfferPage.selectContinue()
    await acceptYourOfferPage.selectAcceptOffer()
    const confirmationText = await offerAcceptedPage.getConfirmationText()
    expect(confirmationText).toBe('Offer accepted')
  })

  it('should validate agreement is accepted along with invoice details via API', async () => {
    console.log(`agreement accepted: ${agreementId}`)
    const agreementData = await getAgreement(agreementId)
    expect(agreementData).not.toBeUndefined()
    expect(agreementData).toMatchObject({ sbi, status: 'accepted' })
    // expect(agreementData.invoice).toBeDefined()
    // expect(agreementData.invoice[0].paymentHubRequest.value).toBe(22.14)
  })

  it('should un-accept the agreement and validate via API', async () => {
    await unacceptAgreement(agreementId)
    const agreementData = await getAgreement(agreementId)
    console.log(
      'agreementData after unaccept:-----',
      JSON.stringify(agreementData, null, 2)
    )
    expect(agreementData).toMatchObject({
      sbi,
      status: 'offered'
    })
  })
  it.skip('re-acceptance of agreement and validate via API', async () => {
    await browser.url(`/agreement/${agreementId}`)
    await reviewOfferPage.open(agreementId)
    await reviewOfferPage.selectContinue()
    await acceptYourOfferPage.selectAcceptOffer()
    const confirmationText = await offerAcceptedPage.getConfirmationText()
    expect(confirmationText).toBe(constants.OFFER_ACCEPTED_HEADER)
    const agreementData = await getAgreement(agreementId)
    console.debug(
      'agreementData after accept:-----',
      JSON.stringify(agreementData, null, 2)
    )
    expect(agreementData).not.toBeUndefined()
    expect(agreementData).toMatchObject({ sbi, status: 'accepted' })
    // expect(agreementData.invoice).toBeDefined()
    // expect(agreementData.invoice[0].paymentHubRequest.value).toBe(22.14)
    // expect(agreementData.invoice[1].paymentHubRequest.value).toBe(22.14)
  })
})
