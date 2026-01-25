import { expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import { getAgreement } from '../services/get-agreement.js'
import { getPaymentHubRequest } from '~/test/services/get-payment-hub-request.js'
import { LoginPage } from '../page-objects/login.page.js'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const loginPage = new LoginPage()

describe('Given the applicant has reviewed and accepted the offer ', () => {
  describe('When the applicant views “Offer accepted” page', () => {
    let agreementId
    let sbi
    let agreementData
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      agreementData = await getAgreement(agreementId)
      sbi = agreement.sbi
      console.log(`Created offer with ID: ${agreementId}`)
      await loginPage.login(sbi)
      await reviewOfferPage.selectContinue()
      await acceptYourOfferPage.clickConfirmCheckbox()
      await acceptYourOfferPage.selectAcceptOffer()
      const paymentData = await getPaymentHubRequest(agreementId)
      expect(paymentData).toBeDefined()
    })

    it('Then should show the payment hub request with correct details', async () => {
      expect(agreementData.invoice).toBeDefined()
      expect(agreementData.invoice.length).toBeGreaterThan(0)

      const invoice = agreementData.invoice[0]
      const req = invoice.paymentHubRequest

      expect(req).toBeDefined()

      // Core identifiers
      expect(req.sbi).toBe(agreementData.identifiers.sbi)
      // expect(req.frn).toBe(agreementData.identifiers.frn)
      expect(req.agreementNumber).toBe(agreementData.agreementNumber)
      expect(req.sourceSystem).toBe('FPTT')

      // Financial details
      expect(req.currency).toBe('GBP')
      expect(req.ledger).toBe('AP')
      expect(req.value).toBeGreaterThan(0)

      // Dates & year
      expect(req.marketingYear).toBe(2026)
      expect(req.dueDate).toMatch(/\d{4}-\d{2}-\d{2}/)

      // Invoice lines
      expect(req.invoiceLines.length).toBeGreaterThan(0)
    })
  })
})
