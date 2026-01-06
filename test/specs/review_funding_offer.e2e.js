import path from 'node:path'
import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import * as constants from '../support/constants.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import { LoginPage } from '../page-objects/login.page.js'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const loginPage = new LoginPage()

describe('Given the farmer is authenticated', () => {
  describe('When the farmer navigates to “Review your funding offer” page', () => {
    let agreementId
    let sbi
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      sbi = agreement.sbi
      console.log(`Created agreement with ID: ${agreementId}`)
      await loginPage.login(sbi)
    })

    it('Then should show Beta phase banner', async () => {
      expect(await reviewOfferPage.isBetaBannerPresent()).toBe(true)
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle(constants.REVIEW_FUNDING_OFFER_TITLE)
    })

    it('Then should show the Farm Details', async () => {
      const text = await reviewOfferPage.getFarmName()
      expect(text).toContain(constants.DEFAULT_FARM_NAME)
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

    it('should have terms and conditions link', async () => {
      const link = await reviewOfferPage.getTermsAndConditionsLink()
      await expect(link).toHaveAttribute(
        'href',
        '/farm-payments/terms-and-conditions',
        { atStart: true }
      )
    })

    it('should have technical test information link', async () => {
      const link = await reviewOfferPage.getTechnicalTestInfoLink()
      await expect(link).toHaveAttribute(
        'href',
        '/farm-payments/fptt-information',
        { atStart: true }
      )
    })

    it('should have technical test actions link', async () => {
      const link = await reviewOfferPage.getTechnicalTestActionsLink()
      await expect(link).toHaveAttribute(
        'href',
        '/farm-payments/fptt-actions',
        {
          atStart: true
        }
      )
    })

    it('should have draft agreement link', async () => {
      const link = await reviewOfferPage.getDraftAgreementLink()
      await expect(link).toHaveAttribute(
        'href',
        path.join(browser.options.proxy, agreementId, 'print'),
        { atStart: true }
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
        expect(rowData.duration).toBe(
          constants.DEFAULT_ACTION_TABLE_DATA[i].duration
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
      // eslint-disable-next-line wdio/no-pause
      browser.pause(2000)
      expect(await acceptYourOfferPage.getPageHeader()).toBe(
        constants.ACCEPT_OFFER_HEADER
      )
    })
  })
})
