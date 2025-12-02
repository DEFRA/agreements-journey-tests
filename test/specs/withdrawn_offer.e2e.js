import { browser, expect } from '@wdio/globals'
import { LoginPage } from '../page-objects/login.page.js'
import {
  createTestAgreement,
  withdrawOffer
} from '../support/agreement-helper.js'
import { WithdrawnOfferPage } from '../page-objects/withdrawn-offer.page.js'
import * as constants from '../support/constants.js'
const loginPage = new LoginPage()
const withdrawnOfferPage = new WithdrawnOfferPage()

// withdraw offer is fast follower and will be tested when Case Working is ready , skip testing for now
describe.skip('Given the applicant has asked for changes to the offer ', () => {
  describe('When the CW withdraws the offer', () => {
    let agreementId
    let sbi
    const clientRef = 'ref-e2e-002'
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement(clientRef)
      agreementId = agreement.agreementId
      sbi = agreement.sbi
      console.log(`Created test agreement with ID: ${agreementId}`)
      await withdrawOffer(clientRef)
      await loginPage.login()
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle(constants.WITHDRAW_OFFER_TITLE)
    })

    it('Then should show the Farm Details', async () => {
      const text = await withdrawnOfferPage.getFarmName()
      expect(text).toContain(constants.DEFAULT_FARM_NAME)
      expect(await withdrawnOfferPage.getSBI()).toBe(sbi)
      expect(await withdrawnOfferPage.getFarmerName()).toBe(
        constants.DEFAULT_FARMER_NAME
      )
    })

    it('Then should see funding offer is currently being updated', async () => {
      expect(await withdrawnOfferPage.getBodyText()).toBe(
        'Your funding offer is currently being updated.'
      )
      expect(await withdrawnOfferPage.getHeading()).toBe(
        'You have requested an update to your offer'
      )
    })
  })
})
