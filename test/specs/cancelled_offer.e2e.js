import { browser, expect } from '@wdio/globals'
import { LoginPage } from '../page-objects/login.page.js'
import {
  cancelOffer,
  createTestAgreement
} from '../support/agreement-helper.js'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import * as constants from '../support/constants.js'
import { UpdateOfferPage } from 'page-objects/update-offer.page.js'
import { getAgreement } from '~/test/services/get-agreement.js'
const loginPage = new LoginPage()
const updateOfferPage = new UpdateOfferPage()
const reviewOfferPage = new ReviewOfferPage()

describe('Given the applicant has asked for changes to the offer ', () => {
  describe('When the CW cancels the offer', () => {
    let agreementId
    let sbi
    const clientRef = 'ref-e2e-002'
    before(async function () {
      // Step 1: Create agreement
      const agreement = await createTestAgreement()
      agreementId = agreement.agreementId
      sbi = agreement.sbi
      const agreementData = await getAgreement(agreementId)
      console.log(`Created offer with ID: ${agreementId}, SBI: ${sbi}`)
      console.log('agreementData:', JSON.stringify(agreementData, null, 2))
      // Step 2: Login & accept offer
      await loginPage.login(sbi)
      await reviewOfferPage.selectContinue()
      // Step 3: Trigger termination via API/helper
      // eslint-disable-next-line wdio/no-pause
      browser.pause(10000)
      await cancelOffer(clientRef, agreementId)
      // Step 4: Wait until UI reflects terminated state
      await browser.waitUntil(
        async () => {
          await browser.refresh()

          const title = await browser.getTitle()
          console.log('Current title after refresh:', title)

          return title === constants.WITHDRAW_OFFER_TITLE
        },
        {
          timeout: 60000,
          interval: 3000,
          timeoutMsg: 'Agreement updated page did not load after termination'
        }
      )
      // agreementData = await getAgreement(agreementId)
      // console.log(`Created offer with ID: ${agreementId}, SBI: ${sbi}`)
      // console.log('agreementData:', JSON.stringify(agreementData, null, 2))
    })
    it('Then should show the cancelled title', async () => {
      await expect(browser).toHaveTitle(constants.WITHDRAW_OFFER_TITLE)
    })

    it('Then should show Privacy link in footer', async () => {
      const privacyLink = await updateOfferPage.getFooterLinkByText(
        'Privacy (opens in new tab)'
      )

      await expect(privacyLink).toBeExisting()
      await expect(privacyLink).toBeDisplayed()
    })

    it('And should show Cookies link in footer', async () => {
      const cookiesLink = await updateOfferPage.getFooterLinkByText('Cookies')

      await expect(cookiesLink).toBeExisting()
      await expect(cookiesLink).toBeDisplayed()
    })

    it('Then should show the Farm Details', async () => {
      const text = await updateOfferPage.getFarmName()
      expect(text).toContain(constants.DEFAULT_FARM_NAME)
      expect(await updateOfferPage.getSBI()).toBe(sbi)
      expect(await updateOfferPage.getFarmerName()).toBe(
        constants.DEFAULT_FARMER_NAME
      )
    })

    it('Then should see funding offer is currently being updated', async () => {
      expect(await updateOfferPage.getBodyText()).toBe(
        'Your funding offer is currently being updated.'
      )
      expect(await updateOfferPage.getHeading()).toBe(
        'You have requested an update to your offer'
      )
    })
  })
})
