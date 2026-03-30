import { browser, expect } from '@wdio/globals'
import { LoginPage } from '../page-objects/login.page.js'
import {
  createTestAgreement,
  terminateOffer
} from '../support/agreement-helper.js'
import * as constants from '../support/constants.js'
import { getAgreement } from '~/test/services/get-agreement.js'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from 'page-objects/accept-your-offer.page.js'
import { TerminateOfferPage } from 'page-objects/terminate-offer.page.js'
import dayjs from 'dayjs'

const loginPage = new LoginPage()
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const terminateOfferPage = new TerminateOfferPage()

describe('Given the applicant has asked to terminate the agreement', () => {
  describe('When the CW terminates the agreement', () => {
    let agreementId
    let sbi
    const clientRef = 'ref-e2e-002'

    before(async () => {
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
      await acceptYourOfferPage.clickConfirmCheckbox()
      await acceptYourOfferPage.selectAcceptOffer()

      // Step 3: Trigger termination via API/helper
      await terminateOffer(clientRef, agreementId)

      // Step 4: Wait until UI reflects terminated state
      await browser.waitUntil(
        async () => {
          await browser.refresh()

          const title = await browser.getTitle()
          console.log('Current title after refresh:', title)

          return title === constants.AGREEMENT_ENDED_TITLE
        },
        {
          timeout: 60000,
          interval: 3000,
          timeoutMsg: 'Agreement ended page did not load after termination'
        }
      )
    })

    it('Then should show the correct page title', async () => {
      await expect(browser).toHaveTitle(constants.AGREEMENT_ENDED_TITLE)
    })

    it('Then should show the correct header', async () => {
      const headerText = await terminateOfferPage.getConfirmationText()
      await expect(headerText).toBe(constants.TERMINATE_HEADER)
    })

    it('Then should show correct end date', async () => {
      const startDateText = await terminateOfferPage.getStartDateText()
      const formattedDate = dayjs().format('D MMMM YYYY')
      await expect(startDateText).toContain(constants.END_DATE)
      await expect(startDateText).toContain(formattedDate)
    })

    it('Then should show Privacy link in footer', async () => {
      const privacyLink = await terminateOfferPage.getFooterLinkByText(
        'Privacy (opens in new tab)'
      )

      await expect(privacyLink).toBeExisting()
      await expect(privacyLink).toBeDisplayed()
    })

    it('And should show Cookies link in footer', async () => {
      const cookiesLink =
        await terminateOfferPage.getFooterLinkByText('Cookies')

      await expect(cookiesLink).toBeExisting()
      await expect(cookiesLink).toBeDisplayed()
    })

    it('And should expand the help section', async () => {
      await terminateOfferPage.toggleHelpText()

      await browser.waitUntil(
        async () => {
          const guidanceText = await terminateOfferPage.getHelpText()
          const normalised = guidanceText.replace(/\s+/g, ' ').trim()
          return normalised.includes(constants.HELP_TEXT)
        },
        {
          timeout: 10000,
          timeoutMsg: 'Help text did not appear after expanding'
        }
      )

      const guidanceText = await terminateOfferPage.getHelpText()
      await expect(guidanceText).toContain(constants.HELP_TEXT)
    })
  })
})
