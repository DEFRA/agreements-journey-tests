import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import {
  createTestAgreement,
  getQuarterAfterMonths
} from '../support/agreement-helper.js'
import { getAgreement } from '../services/get-agreement.js'
import { getPaymentHubRequest } from '~/test/services/get-payment-hub-request.js'
import { LoginPage } from '../page-objects/login.page.js'
import {
  ACCOUNTCODE,
  CURRENCY,
  DELIVERY_BODY,
  FES_CODE,
  FUNDCODE,
  LEDGER,
  SCHEMECODE,
  SOURCE_SYSTEM
} from '~/test/support/payment_hub_constants.js'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const loginPage = new LoginPage()

describe('Payments Check : Given the applicant has reviewed and accepted the offer ', () => {
  describe('When the views “Offer accepted” page', () => {
    let agreementId
    let sbi
    let agreementData
    let paymentData
    let paymentHubRequest
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      agreementData = await getAgreement(agreementId)
      sbi = agreement.sbi
      console.log(`Created offer with ID: ${agreementId}`)
      await loginPage.login(sbi)
      // eslint-disable-next-line wdio/no-pause
      // await browser.pause(100000)
      await reviewOfferPage.selectContinue()
      await acceptYourOfferPage.clickConfirmCheckbox()
      await acceptYourOfferPage.selectAcceptOffer()
      // eslint-disable-next-line wdio/no-pause
      await browser.pause(1000)
      paymentData = await getPaymentHubRequest(agreementId)
      paymentHubRequest = paymentData?.paymentHubRequest
    })

    it('0. should have paymentHubRequest', async () => {
      expect(paymentHubRequest).toBeDefined()
    })

    it('1. should have correct source system', async () => {
      expect(paymentHubRequest?.sourceSystem).toBe(SOURCE_SYSTEM)
    })

    it('2. should have correct ledger', async () => {
      expect(paymentHubRequest?.ledger).toBe(LEDGER)
    })

    it('3. should have correct delivery body', async () => {
      expect(paymentHubRequest?.deliveryBody).toBe(DELIVERY_BODY)
    })

    it('4. should have correct FRN', async () => {
      expect(paymentHubRequest?.frn).toBe(agreementData.identifiers.frn)
    })

    it('5. should have correct SBI', async () => {
      expect(paymentHubRequest?.sbi).toBe(agreementData.identifiers.sbi)
    })

    it('6. should have correct FES code', async () => {
      expect(paymentHubRequest?.fesCode).toBe(FES_CODE)
    })

    it('7. should have correct marketing year', async () => {
      expect(paymentHubRequest?.marketingYear).toBe(new Date().getFullYear())
    })

    it('8. should have correct payment request number', async () => {
      expect(paymentHubRequest?.paymentRequestNumber).toEqual(
        expect.any(Number)
      )
    })

    it('9. should have valid agreement number format', async () => {
      expect(paymentData?.agreementNumber).toMatch(/^FPTT.{9}$/)
    })

    it('10. should have valid claim ID format', async () => {
      expect(paymentData?.claimId).toMatch(/^R0000.{4}$/)
    })

    it('11. should have correct invoice number format', async () => {
      const quarter = getQuarterAfterMonths()
      const claimId = paymentData?.claimId
      const invoiceRegex = new RegExp(`^${claimId}-V\\d{3}${quarter}$`)
      expect(paymentData?.invoiceNumber).toMatch(invoiceRegex)
    })

    it('12. should have correct currency', async () => {
      expect(paymentHubRequest?.currency).toMatch(CURRENCY)
    })

    it('13. should have due date defined', async () => {
      expect(paymentHubRequest?.dueDate).toBeDefined()
    })

    it('14. should have annual value defined', async () => {
      expect(paymentHubRequest?.annualValue).toBe(-702.85)
    })

    it('15. should have remittance description', async () => {
      expect(paymentHubRequest?.remittanceDescription).toMatch(
        'Farm Payments Technical Test Payment'
      )
    })

    it('16. should have debt type', async () => {
      expect(paymentHubRequest?.debtType).toMatch('')
    })

    it('17. should have recovery date', async () => {
      expect(paymentHubRequest?.recoveryDate).toMatch('')
    })

    it('18. should have original invoice number', async () => {
      expect(paymentHubRequest?.originalInvoiceNumber).toMatch('')
    })

    it('19. should have original settlement date', async () => {
      expect(paymentHubRequest?.originalSettlementDate).toMatch('')
    })

    it('20.1 to 20.8 Then should show the payment hub request with correct Invoice Lines', async () => {
      const paymentHubRequest = paymentData?.paymentHubRequest
      expect(paymentHubRequest).toBeDefined()

      const invoiceLines = paymentHubRequest?.invoiceLines
      expect(invoiceLines).toBeDefined()
      expect(invoiceLines?.length).toBe(4) // 4 quarters

      // Exact values
      const quarter1Values = [-12.63, -78.5, -5.76, -10.86, -68]
      const otherQuarterValues = [-12.6, -78.5, -5.75, -10.85, -68]

      invoiceLines.forEach((quarterLines, quarterIndex) => {
        const quarterNumber = quarterIndex + 1
        expect(quarterLines.length).toBeGreaterThan(0)

        quarterLines.forEach((line, lineIndex) => {
          const expectedValue =
            quarterNumber === 1
              ? quarter1Values[lineIndex]
              : otherQuarterValues[lineIndex]
          // 20.1
          expect(line.accountCode).toBe(ACCOUNTCODE)
          // 20.2
          expect(line.fundCode).toBe(FUNDCODE)
          // 20.3
          expect(line.agreementNumber).toMatch(/^FPTT.{9}$/)
          // 20.4
          expect(line.description).toMatch(/\d{4}-\d{2}-\d{2}/)
          // 20.5
          expect(line.value).toBe(expectedValue)
          // 20.6
          expect(line.deliveryBody).toBe(DELIVERY_BODY)
          // 20.7
          expect(line.marketingYear).toBe(new Date().getFullYear())
          // 20.8
          expect(SCHEMECODE).toContain(line.schemeCode)
          console.log(`Quarter ${quarterNumber}, Line ${lineIndex + 1} `)
        })
      })
    })
  })
})
