import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import { unacceptAgreement } from '../services/unaccept-agreement.js'
import { AcceptYourOfferPage } from 'page-objects/accept-your-offer.page.js'
import * as constants from '../utils/constants.js'

const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()

describe('Given the applicant is authenticated', () => {
  describe('When the applicant navigate to their “Review your funding offer” page', () => {
    before(async () => {
      try {
        await unacceptAgreement(constants.DEFAULT_AGREEMENT_ID)
      } catch (e) {
        console.warn('making sure agreement is setup for use')
      }
      await reviewOfferPage.open(constants.DEFAULT_AGREEMENT_ID)
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle(constants.REVIEW_FUNDING_OFFER_TITLE)
    })

    it('Then should show the Farm Details', async () => {
      expect(await reviewOfferPage.getFarmName()).toBe(constants.FARM_NAME)
      expect(await reviewOfferPage.getSBI()).toBe(constants.SBI)
      expect(await reviewOfferPage.getFarmerName()).toBe(constants.FARMER_NAME)
    })

    it('Then should show Header', async () => {
      expect(await reviewOfferPage.getPageHeader()).toBe(
        constants.REVIEW_OFFER_HEADER
      )
    })

    it('Then should show Actions table details correctly', async () => {
      for (let i = 0; i < constants.ACTION_TABLE_DATA.length; i++) {
        const rowIndex = i + 1
        const rowData = await reviewOfferPage.getActionTableRowData(rowIndex)
        expect(rowData.action).toBe(constants.ACTION_TABLE_DATA[i].action)
        expect(rowData.code).toBe(constants.ACTION_TABLE_DATA[i].code)
        expect(rowData.parcel).toBe(constants.ACTION_TABLE_DATA[i].parcel)
        expect(rowData.quantity).toBe(constants.ACTION_TABLE_DATA[i].quantity)
      }
    })

    it('Then should show the Payment table details correctly', async () => {
      for (let i = 0; i < constants.PAYMENTS_DATA.length; i++) {
        const rowIndex = i + 1
        const rowData = await reviewOfferPage.getPaymentsTableRowData(rowIndex)
        expect(rowData.action).toBe(constants.PAYMENTS_DATA[i].action)
        expect(rowData.code).toBe(constants.PAYMENTS_DATA[i].code)
        expect(rowData.paymentRate).toBe(constants.PAYMENTS_DATA[i].rate)
        expect(rowData.quarterlyPayment).toBe(
          constants.PAYMENTS_DATA[i].quarterlyPayment
        )
        expect(rowData.yearlyPayment).toBe(
          constants.PAYMENTS_DATA[i].yearlyPayment
        )
      }
      expect(await reviewOfferPage.getTotalQuarterlyPayment()).toBe(
        constants.TOTAL_QUARTERLY_PAYMENT
      )
      expect(await reviewOfferPage.getTotalYearlyPayment()).toBe(
        constants.TOTAL_YEARLY_PAYMENT
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
