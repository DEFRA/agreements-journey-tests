import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from 'page-objects/accept-your-offer.page.js'
import * as constants from '../support/constants.js'
import { LoginPage } from 'page-objects/login.page.js'
import {
  createTestAgreement,
  updateTestAgreement
} from '../support/agreement-helper.js'
import { getAgreement } from '../services/get-agreement.js'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const loginPage = new LoginPage()

describe('Given the applicant has asked for changes to the offer ', () => {
  describe('When the applicant views “Offer review” page for offer update', () => {
    let agreementId
    let frn
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      await getAgreement(agreementId)
      frn = agreement.frn
      await updateTestAgreement(frn)
      console.log(`Created offer with ID: ${agreementId}`)
      await loginPage.login(agreementId)
    })

    it('Then should see the new version and is able to accept the agreement', async () => {
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
          constants.DEFAULT_ACTION_TABLE_DATA_UPDATED[i].quantity
        )
        await reviewOfferPage.selectContinue()
        await acceptYourOfferPage.selectAcceptOffer()
        await expect(browser).toHaveTitle(constants.OFFER_ACCEPTED_TITLE)
      }
    })
  })
})
