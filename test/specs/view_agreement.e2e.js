import { expect } from '@wdio/globals'
import { ReviewOfferPage } from '../page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from '../page-objects/accept-your-offer.page.js'
import { OfferAcceptedPage } from '../page-objects/offer-accepted.page.js'
import { ViewAgreementPage } from '../page-objects/view-agreement.page.js'
import * as constants from '../support/constants.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import { getAgreement } from '../services/get-agreement.js'
import { LoginPage } from '../page-objects/login.page.js'
import dayjs from 'dayjs'

const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()
const viewAgreementPage = new ViewAgreementPage()
const loginPage = new LoginPage()

describe('Given the applicant has reviewed and accepted the offer', () => {
  describe('When the applicant views the “View agreement” page', () => {
    let agreementId, sbi, agreementData

    before(async () => {
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      agreementData = await getAgreement(agreementId)
      sbi = agreement.sbi

      await loginPage.login(agreementId)
      await reviewOfferPage.selectContinue()
      await acceptYourOfferPage.clickConfirmCheckbox()
      await acceptYourOfferPage.selectAcceptOffer()
      await offerAcceptedPage.clickViewAgreementLink()
    })

    it('Then should show the Farm Details', async () => {
      const text = await viewAgreementPage.getFarmName()
      expect(text).toContain(constants.DEFAULT_FARM_NAME)
      expect(await viewAgreementPage.getSBI()).toBe(sbi)
      expect(await viewAgreementPage.getFarmerName()).toBe(
        constants.DEFAULT_FARMER_NAME
      )
    })

    it('Then should show Header', async () => {
      expect(await viewAgreementPage.getHeading()).toBe(constants.FARM_NAME)
      expect(await viewAgreementPage.getAgreementHolder()).toBe(
        constants.DEFAULT_FARM_NAME
      )
      expect(await viewAgreementPage.getSBIValue()).toBe(sbi)
      expect(await viewAgreementPage.getAddress()).toBe(
        constants.DEFAULT_ADDRESS
      )
      expect(await viewAgreementPage.getAgreementName()).toBe(
        constants.DEFAULT_AGREEMENT_NAME
      )
      expect(await viewAgreementPage.getAgreementNumber()).toBe(agreementId)
      const formattedDate = dayjs(
        agreementData.payment.agreementStartDate
      ).format('D MMMM YYYY')
      expect(await viewAgreementPage.getStartDate()).toBe(formattedDate)
    })

    it('Then should display all expected sub-headers', async () => {
      for (const header of constants.SUB_HEADERS) {
        const element = await viewAgreementPage[header.element]
        await expect(element).toBeDisplayed()
        await expect(element).toHaveText(header.expected)
      }
    })

    it('Then should display all expected contents links', async () => {
      for (const link of constants.EXPECTED_CONTENTS) {
        const element = await viewAgreementPage[link.element]
        await expect(element).toBeDisplayed()
        await expect(element).toHaveText(link.expected)
      }
    })

    it('Then should show the Print this page button', async () => {
      expect(await viewAgreementPage.getPrintButtonText()).toBe(
        'Print this page'
      )
      expect(await viewAgreementPage.getPrintButtonClass()).toContain(
        'gem-c-print-link__button'
      )
      expect(await viewAgreementPage.isPrintButtonClickable()).toBe(true)
      expect(await viewAgreementPage.getPrintButtonDataModule()).toBe(
        'print-link'
      )
    })

    it('Then should display - Land covered by the agreement', async () => {
      const parcelCell = await viewAgreementPage.getTableCell('landTable', 0, 0)
      const areaCell = await viewAgreementPage.getTableCell('landTable', 0, 1)

      await expect(parcelCell).toBeDisplayed()
      await expect(parcelCell).toHaveText(constants.EXPECTED_PARCEL)

      await expect(areaCell).toBeDisplayed()
      await expect(areaCell).toHaveText(constants.EXPECTED_AREA)
    })

    it('Then should display - Summary of actions', async () => {
      const expectedValues = [
        'SD6743 8083',
        'CMOR1',
        'Assess moorland and produce a written record',
        '4.53411078',
        '01/09/2025',
        '01/09/2028'
      ]

      for (let col = 0; col < expectedValues.length; col++) {
        const element = await viewAgreementPage.getTableCell(
          'actionsTable',
          0,
          col
        )
        await expect(element).toBeDisplayed()
        await expect(element).toHaveText(expectedValues[col])
      }
    })

    it('Then should display - Summary of payments', async () => {
      const expectedRows = [
        [
          'CMOR1',
          'CMOR1: Assess moorland and produce a written record',
          '4.5341',
          '£10.60 per ha',
          '£12.01',
          '£12.01',
          '£48.06'
        ],
        [
          'CMOR1',
          'One-off payment per agreement per year for Assess moorland and produce a written record',
          '',
          '',
          '£68.00',
          '£68.00',
          '£272.00'
        ]
      ]

      for (let rowIndex = 0; rowIndex < expectedRows.length; rowIndex++) {
        const row = expectedRows[rowIndex]
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
          const element = await viewAgreementPage.getTableCell(
            'paymentsTable',
            rowIndex,
            colIndex
          )
          await expect(element).toBeDisplayed()
          await expect(element).toHaveText(row[colIndex])
        }
      }
    })

    it('Then should display - Payment schedule', async () => {
      const expectedRows = [
        ['CMOR1', '£80.01', '£320.04', '£320.04', '£240.03', '£960.12'],
        ['Total', '£80.01', '£320.04', '£320.04', '£240.03', '£960.12']
      ]

      for (let rowIndex = 0; rowIndex < expectedRows.length; rowIndex++) {
        const row = expectedRows[rowIndex]
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
          const element = await viewAgreementPage.getTableCell(
            'scheduleTable',
            rowIndex,
            colIndex
          )
          await expect(element).toBeDisplayed()
          await expect(element).toHaveText(row[colIndex])
        }
      }
    })
  })
})
