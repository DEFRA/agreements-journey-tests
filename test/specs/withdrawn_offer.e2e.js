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
      await loginPage.login(sbi)
      // eslint-disable-next-line wdio/no-pause
      // await browser.pause(20000)
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle(constants.WITHDRAW_OFFER_TITLE)
    })

    it('Then should show Privacy link in footer', async () => {
      const privacyLink = await withdrawnOfferPage.getFooterLinkByText(
        'Privacy (opens in new tab)'
      )

      await expect(privacyLink).toBeExisting()
      await expect(privacyLink).toBeDisplayed()
    })

    it('And should show Cookies link in footer', async () => {
      const cookiesLink =
        await withdrawnOfferPage.getFooterLinkByText('Cookies')

      await expect(cookiesLink).toBeExisting()
      await expect(cookiesLink).toBeDisplayed()
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
