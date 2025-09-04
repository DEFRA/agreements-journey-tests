import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from 'page-objects/accept-your-offer.page.js'
import { OfferAcceptedPage } from 'page-objects/offer-accepted.page.js'
import * as constants from '../support/constants.js'
import { createTestAgreement } from '../support/agreement-helper.js'
import { getAgreement } from '../services/get-agreement.js'
import dayjs from 'dayjs'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()

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
      await reviewOfferPage.open(agreementId)
      await reviewOfferPage.selectContinue()
      await acceptYourOfferPage.selectAcceptOffer()
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle(constants.OFFER_ACCEPTED_TITLE)
    })

    it('Then should show the Farm Details', async () => {
      expect(await offerAcceptedPage.getFarmName()).toBe(
        constants.DEFAULT_FARM_NAME
      )
      expect(await offerAcceptedPage.getSBI()).toBe(sbi)
      expect(await offerAcceptedPage.getFarmerName()).toBe(
        constants.DEFAULT_FARMER_NAME
      )
    })

    it('Then should show Header', async () => {
      expect(await offerAcceptedPage.getConfirmationText()).toBe(
        constants.OFFER_ACCEPTED_HEADER
      )
    })

    it('Then should show start date', async () => {
      const formattedDate = dayjs(agreementData.agreementStartDate).format(
        'DD MMMM YYYY'
      )
      expect(await offerAcceptedPage.getStartDateText()).toBe(
        constants.START_DATE + formattedDate
      )
    })

    it('Then should show agreement number', async () => {
      expect(await offerAcceptedPage.getReferenceNumber()).toBe(
        constants.AGREEMENT_REFERENCE + agreementId + constants.FULL_STOP
      )
    })

    it('should expand the help section', async () => {
      await offerAcceptedPage.toggleHelpText()
      const guidanceText = await offerAcceptedPage.getHelpText()
      expect(guidanceText).toContain(constants.HELP_TEXT)
    })
  })
})
