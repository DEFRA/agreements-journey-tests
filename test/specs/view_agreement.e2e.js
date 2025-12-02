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

      await loginPage.login()
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
      const parcelCellOne = await viewAgreementPage.getTableCell(
        'landTable',
        0,
        0
      )
      const areaCellOne = await viewAgreementPage.getTableCell(
        'landTable',
        0,
        1
      )
      const parcelCellTwo = await viewAgreementPage.getTableCell(
        'landTable',
        1,
        0
      )
      const areaCellTwo = await viewAgreementPage.getTableCell(
        'landTable',
        1,
        1
      )

      await expect(parcelCellOne).toBeDisplayed()
      await expect(parcelCellOne).toHaveText(constants.EXPECTED_PARCEL)

      await expect(areaCellOne).toBeDisplayed()
      await expect(areaCellOne).toHaveText(constants.EXPECTED_AREA)

      await expect(parcelCellTwo).toBeDisplayed()
      await expect(parcelCellTwo).toHaveText(constants.EXPECTED_PARCEL_TWO)

      await expect(areaCellTwo).toBeDisplayed()
      await expect(areaCellTwo).toHaveText(constants.EXPECTED_AREA_TWO)
    })

    it('Then should display - Summary of actions', async () => {
      const now = new Date()
      const startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      const endDate = new Date(startDate)
      endDate.setFullYear(endDate.getFullYear() + 3)
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
          'CMOR1',
          'Assess moorland and produce a written record',
          '4.7575',
          '£10.60 per ha',
          '£12.60',
          '£12.60',
          '£50.42'
        ],
        [
          'CMOR1',
          'Assess moorland and produce a written record',
          '2.1705',
          '£10.60 per ha',
          '£5.75',
          '£5.75',
          '£23.00'
        ],
        [
          'CMOR1',
          'One-off payment per agreement per year for Assess moorland and produce a written record',
          '',
          '',
          '£68.00',
          '£68.00',
          '£272.00'
        ],
        [
          'UPL1',
          'Moderate livestock grazing on moorland',
          '2.1705',
          '£20.00 per ha',
          '£10.85',
          '£10.85',
          '£43.41'
        ],
        [
          'UPL3',
          'Limited livestock grazing on moorland',
          '4.7575',
          '£66.00 per ha',
          '£78.49',
          '£78.49',
          '£313.99'
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
        ['CMOR1', '£259.05', '£345.40', '£345.40', '£86.35', '£1,036.20'],
        ['UPL1', '£32.55', '£43.40', '£43.40', '£10.85', '£130.20'],
        ['UPL3', '£235.47', '£313.96', '£313.96', '£78.49', '£941.88'],
        ['Total', '£527.07', '£702.76', '£702.76', '£175.69', '£2,108.28']
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
