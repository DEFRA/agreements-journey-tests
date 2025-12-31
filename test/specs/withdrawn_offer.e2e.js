import { browser, expect } from '@wdio/globals'
import {
  createTestAgreement,
  withdrawOffer
} from '../support/agreement-helper.js'
import { WithdrawnOfferPage } from '../page-objects/withdrawn-offer.page.js'
import * as constants from '../support/constants.js'
import { genAuthHeader } from '../support/gen-auth-header.js'
const withdrawnOfferPage = new WithdrawnOfferPage()

describe('Given the applicant has asked for changes to the offer ', () => {
  describe('When the CW withdraws the offer', () => {
    let agreementNumber
    let sbi
    const clientRef = 'ref-e2e-002'
    before(async function () {
      // Step 1: Create agreement
      const agreement = await createTestAgreement(clientRef)
      agreementNumber = agreement.agreementId
      sbi = agreement.sbi
      console.log(`Created test agreement with ID: ${agreementNumber}`)
      await withdrawOffer(clientRef, agreementNumber)
      this.timeout(30000)

      const headers = genAuthHeader({ sbi })
      await browser.cdp('Network', 'setExtraHTTPHeaders', { headers })

      // Using reviewOfferPage.open() or navigating directly to the proxy might work
      // Since it's a withdrawn offer, navigating to any protected route should redirect to the withdrawn page
      await browser.url(browser.options.proxy)
      // eslint-disable-next-line wdio/no-pause
      // await browser.pause(20000)
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
