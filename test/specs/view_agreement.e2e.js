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
      console.log('agreementData', agreementData)
      sbi = agreement.sbi

      await loginPage.login(sbi)
      await reviewOfferPage.selectContinue()
      await acceptYourOfferPage.clickConfirmCheckbox()
      await acceptYourOfferPage.selectAcceptOffer()
      await offerAcceptedPage.clickAgreementDocumentLink()
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
      expect(await viewAgreementPage.getHeading()).toBe(
        constants.AGREEMENT_NAME
      )
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
      const startDateNextMonth = dayjs()
        .add(1, 'month')
        .startOf('month')
        .toISOString()
      const formattedDate = dayjs(startDateNextMonth).format('D MMMM YYYY')
      const endDate = dayjs(startDateNextMonth)
        .add(12, 'month')
        .subtract(1, 'day')

      const formattedEndDate = endDate.format('D MMMM YYYY')
      expect(await viewAgreementPage.getStartDate()).toBe(formattedDate)
      expect(await viewAgreementPage.getEndDate()).toBe(formattedEndDate)
    })

    it('Then should show Privacy link in footer', async () => {
      const privacyLink = await viewAgreementPage.getFooterLinkByText(
        'Privacy (opens in new tab)'
      )

      await expect(privacyLink).toBeExisting()
      await expect(privacyLink).toBeDisplayed()
    })

    it('And should show Cookies link in footer', async () => {
      const cookiesLink = await viewAgreementPage.getFooterLinkByText('Cookies')

      await expect(cookiesLink).toBeExisting()
      await expect(cookiesLink).toBeDisplayed()
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
      const parcelCellOne = await viewAgreementPage.getAgreementTableCell(
        'landTable',
        0,
        0
      )
      const areaCellOne = await viewAgreementPage.getAgreementTableCell(
        'landTable',
        0,
        1
      )
      const parcelCellTwo = await viewAgreementPage.getAgreementTableCell(
        'landTable',
        1,
        0
      )
      const areaCellTwo = await viewAgreementPage.getAgreementTableCell(
        'landTable',
        1,
        1
      )

      // Wait until displayed
      await parcelCellOne.waitForDisplayed()
      await areaCellOne.waitForDisplayed()
      await parcelCellTwo.waitForDisplayed()
      await areaCellTwo.waitForDisplayed()
      await expect(parcelCellOne).toHaveText(constants.EXPECTED_PARCEL.trim())
      await expect(areaCellOne).toHaveText(constants.EXPECTED_AREA.trim())
      await expect(parcelCellTwo).toHaveText(
        constants.EXPECTED_PARCEL_TWO.trim()
      )
      await expect(areaCellTwo).toHaveText(constants.EXPECTED_AREA_TWO.trim())
    })

    it('Then should display - Summary of actions', async () => {
      const now = new Date()
      const startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      const endDate = new Date(startDate)
      endDate.setMonth(endDate.getMonth() + 12)
      endDate.setDate(endDate.getDate() - 1)
      const format = (d) => d.toLocaleDateString('en-GB')

      const expectedValues = [
        [
          'SK0971 7555',
          'CMOR1',
          'Assess moorland and produce a written record',
          '4.7575',
          format(startDate),
          format(endDate)
        ],
        [
          'SK0971 7555',
          'UPL3',
          'Limited livestock grazing on moorland',
          '4.7575',
          format(startDate),
          format(endDate)
        ],
        [
          'SK0971 9194',
          'CMOR1',
          'Assess moorland and produce a written record',
          '2.1705',
          format(startDate),
          format(endDate)
        ],
        [
          'SK0971 9194',
          'UPL1',
          'Moderate livestock grazing on moorland',
          '2.1705',
          format(startDate),
          format(endDate)
        ]
      ]

      for (let row = 0; row < expectedValues.length; row++) {
        for (let col = 0; col < expectedValues[row].length; col++) {
          const element = await viewAgreementPage.getTableCell(
            'actionsTable',
            row,
            col
          )
          await expect(element).toBeDisplayed()
          await expect(element).toHaveText(expectedValues[row][col])
        }
      }
    })

    it('Then should display - Summary of payments', async () => {
      const expectedRows = [
        [
          'Assess moorland and produce a written record',
          'CMOR1',
          '£10.60 per ha',
          '£12.63',
          '£12.60',
          '£50.43'
        ],
        [
          'Assess moorland and produce a written record',
          'CMOR1',
          '£10.60 per ha',
          '£5.76',
          '£5.75',
          '£23.01'
        ],
        [
          'Assess moorland and produce a written record',
          'CMOR1',
          '£272 per agreement',
          '£68',
          '£68',
          '£272'
        ],
        [
          'Moderate livestock grazing on moorland',
          'UPL1',
          '£20 per ha',
          '£10.86',
          '£10.85',
          '£43.41'
        ],
        [
          'Limited livestock grazing on moorland',
          'UPL3',
          '£66 per ha',
          '£78.50',
          '£78.50',
          '£314'
        ]
      ]

      // Validate normal rows
      for (let rowIndex = 0; rowIndex < expectedRows.length; rowIndex++) {
        for (
          let colIndex = 0;
          colIndex < expectedRows[rowIndex].length;
          colIndex++
        ) {
          const element = await viewAgreementPage.getTableCell(
            'paymentsTable',
            rowIndex,
            colIndex
          )
          await expect(element).toBeDisplayed()
          await expect(element).toHaveText(expectedRows[rowIndex][colIndex])
        }
      }

      // ✅ Validate totals row (last row)
      const totalsRowIndex = expectedRows.length

      await expect(
        await viewAgreementPage.getTableCell('paymentsTable', totalsRowIndex, 3)
      ).toHaveText('£175.75')

      await expect(
        await viewAgreementPage.getTableCell('paymentsTable', totalsRowIndex, 4)
      ).toHaveText('£175.70')

      await expect(
        await viewAgreementPage.getTableCell('paymentsTable', totalsRowIndex, 5)
      ).toHaveText('£702.85')
    })

    it('Then should display - Agreement start and end dates', async () => {
      const now = new Date()
      const startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      const endDate = new Date(startDate)
      endDate.setMonth(endDate.getMonth() + 12)
      endDate.setDate(endDate.getDate() - 1)

      const format = (d) =>
        d.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })

      const expectedStartDate = format(startDate)
      const expectedEndDate = format(endDate)

      const startDateElement = await viewAgreementPage.getAgreementDate(
        'Agreement start date:'
      )
      const endDateElement = await viewAgreementPage.getAgreementDate(
        'Agreement end date:'
      )

      await expect(startDateElement).toBeDisplayed()
      await expect(startDateElement).toHaveText(expectedStartDate)

      await expect(endDateElement).toBeDisplayed()
      await expect(endDateElement).toHaveText(expectedEndDate)
    })
  })
})
