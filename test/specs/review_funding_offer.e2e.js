import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import * as constants from '../support/constants.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import { LoginPage } from '../page-objects/login.page.js'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const loginPage = new LoginPage()

describe('Given the applicant is authenticated', () => {
  describe('When the applicant navigate to their “Review your funding offer” page', () => {
    let agreementId
    let sbi
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      sbi = agreement.sbi
      console.log(`Created agreement with ID: ${agreementId}`)
      await loginPage.login(agreementId)
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle(constants.REVIEW_FUNDING_OFFER_TITLE)
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
      expect(await reviewOfferPage.getPageHeader()).toBe(
        constants.REVIEW_OFFER_HEADER
      )
    })

    it('Then should show Actions table details correctly', async () => {
      for (let i = 0; i < constants.DEFAULT_ACTION_TABLE_DATA.length; i++) {
        const rowIndex = i + 1
        const rowData = await reviewOfferPage.getActionTableRowData(rowIndex)
        expect(rowData.action).toBe(
          constants.DEFAULT_ACTION_TABLE_DATA[i].action
        )
        expect(rowData.code).toBe(constants.DEFAULT_ACTION_TABLE_DATA[i].code)
        expect(rowData.parcel).toBe(
          constants.DEFAULT_ACTION_TABLE_DATA[i].parcel
        )
        expect(rowData.quantity).toBe(
          constants.DEFAULT_ACTION_TABLE_DATA[i].quantity
        )
      }
    })

    it('Then should show the Payment table details correctly', async () => {
      for (let i = 0; i < constants.DEFAULT_PAYMENTS_DATA.length; i++) {
        const rowIndex = i + 1
        const rowData = await reviewOfferPage.getPaymentsTableRowData(rowIndex)
        expect(rowData.action).toBe(constants.DEFAULT_PAYMENTS_DATA[i].action)
        expect(rowData.code).toBe(constants.DEFAULT_PAYMENTS_DATA[i].code)
        expect(rowData.paymentRate).toBe(
          constants.DEFAULT_PAYMENTS_DATA[i].rate
        )
        expect(rowData.firstPayment).toBe(
          constants.DEFAULT_PAYMENTS_DATA[i].firstPayment
        )
        expect(rowData.subsequentPayments).toBe(
          constants.DEFAULT_PAYMENTS_DATA[i].subsequentPayments
        )
        expect(rowData.yearlyPayment).toBe(
          constants.DEFAULT_PAYMENTS_DATA[i].yearlyPayment
        )
      }
      expect(await reviewOfferPage.getTotalFirstPayment()).toBe(
        constants.DEFAULT_TOTAL_FIRST_PAYMENT
      )
      expect(await reviewOfferPage.getTotalSubsequentPayment()).toBe(
        constants.DEFAULT_TOTAL_SUBSEQUENT_PAYMENT
      )
      expect(await reviewOfferPage.getTotalYearlyPayment()).toBe(
        constants.DEFAULT_TOTAL_YEARLY_PAYMENT
      )
    })

    it('should continue to next page', async () => {
      await reviewOfferPage.selectContinue()
      expect(await acceptYourOfferPage.getPageHeader()).toBe(
        constants.ACCEPT_OFFER_HEADER
      )
    })
  })
})
