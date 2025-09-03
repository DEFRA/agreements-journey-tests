import { expect } from '@wdio/globals'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from 'page-objects/accept-your-offer.page.js'
import { OfferAcceptedPage } from 'page-objects/offer-accepted.page.js'
import { ViewAgreementPage } from 'page-objects/view-agreement.page.js'
import * as constants from '../support/constants.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import { getAgreement } from '../services/get-agreement.js'
import dayjs from 'dayjs'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()
const viewAgreementPage = new ViewAgreementPage()

describe('Given the applicant has reviewed and accepted the offer ', () => {
  describe('When the applicant “View agreement” page', () => {
    let agreementId
    let sbi
    // eslint-disable-next-line no-unused-vars
    let agreementData
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      agreementData = await getAgreement(agreementId)
      sbi = agreement.sbi
      console.log(`Created offer with ID: ${agreementId}`)
      await reviewOfferPage.open(agreementId)
      await reviewOfferPage.selectContinue()
      await acceptYourOfferPage.selectAcceptOffer()
      await offerAcceptedPage.clickViewAgreementLink()
    })

    it('Then should show the Farm Details', async () => {
      expect(await viewAgreementPage.getFarmName()).toBe(
        constants.DEFAULT_FARM_NAME
      )
      expect(await viewAgreementPage.getSBI()).toBe(sbi)
      expect(await viewAgreementPage.getFarmerName()).toBe(
        constants.DEFAULT_FARMER_NAME
      )
    })

    it('Then should show Header', async () => {
      expect(await viewAgreementPage.getHeading()).toBe('Agile Farm agreement')
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
      const formattedDate = dayjs(agreementData.agreementStartDate).format(
        'DD MMMM YYYY'
      )
      expect(await viewAgreementPage.getStartDate()).toBe(formattedDate)
    })

    it('Then should display all expected sub-headers', async () => {
      for (const header of constants.SUB_HEADERS) {
        const element = await viewAgreementPage[header.element]
        await expect(element).toBeDisplayed()
        await expect(element).toHaveText(header.expected)
      }
    })

    it('should display parcel with total area', async () => {
      const parcelNumber = 'SX06799238'
      const expectedArea = '1.23'
      const row = await viewAgreementPage.getParcelRow(parcelNumber)
      await expect(row).toBeDisplayed()
      const areaCell = await viewAgreementPage.getParcelArea(parcelNumber)
      await expect(areaCell).toHaveText(expectedArea)
    })
  })
})
