import path from 'node:path'
import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from 'page-objects/accept-your-offer.page.js'
import { OfferAcceptedPage } from 'page-objects/offer-accepted.page.js'
import * as constants from '../../support/constants.js'
import { createTestAgreement } from '../../support/agreement-helper.js'
import { getAgreement } from '../../services/get-agreement.js'
import { LoginPage } from 'page-objects/login.page.js'
import dayjs from 'dayjs'
import wmpOffer from '~/test/data/wmp_create_offer.json'

const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const offerAcceptedPage = new OfferAcceptedPage()
const loginPage = new LoginPage()

describe('Given the applicant has reviewed and accepted the WMP offer ', () => {
  describe('When the applicant views “WMP Offer accepted” page', () => {
    let agreementId
    let sbi
    let agreementData
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement(wmpOffer)
      agreementId = agreement.agreementId
      agreementData = await getAgreement(agreementId)
      sbi = agreement.sbi
      console.log(`Created offer with ID: ${agreementId} ${sbi}`)
      console.log('agreementData:', JSON.stringify(agreementData, null, 2))
      await loginPage.login(sbi)
      await reviewOfferPage.selectContinue()
      await acceptYourOfferPage.clickConfirmCheckbox()
      await acceptYourOfferPage.selectAcceptOffer()
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle(constants.OFFER_ACCEPTED_TITLE)
    })

    it('Then should show the Farm Details', async () => {
      const text = await offerAcceptedPage.getFarmName()
      expect(text).toContain(constants.WMP_FARM_NAME)
      expect(await offerAcceptedPage.getSBI()).toBe(sbi)
      expect(await offerAcceptedPage.getFarmerName()).toBe(
        constants.WMP_FARMER_NAME
      )
    })

    it('Then should show Header', async () => {
      expect(await offerAcceptedPage.getConfirmationText()).toBe(
        constants.OFFER_ACCEPTED_HEADER
      )
    })

    it('Then should show Privacy link in footer', async () => {
      const privacyLink = await offerAcceptedPage.getFooterLinkByText(
        'Privacy (opens in new tab)'
      )

      await expect(privacyLink).toBeExisting()
      await expect(privacyLink).toBeDisplayed()
    })

    it('And should show Cookies link in footer', async () => {
      const cookiesLink = await offerAcceptedPage.getFooterLinkByText('Cookies')

      await expect(cookiesLink).toBeExisting()
      await expect(cookiesLink).toBeDisplayed()
    })

    it('Then should show start date', async () => {
      const startDateNextMonth = dayjs()
        .add(1, 'month')
        .startOf('month')
        .toISOString()
      const formattedDate = dayjs(startDateNextMonth).format('D MMMM YYYY')
      expect(await offerAcceptedPage.getStartDateText()).toBe(
        `${constants.START_DATE}\n${formattedDate}`
      )
    })

    it('Then should show agreement number', async () => {
      expect(await offerAcceptedPage.getReferenceNumber()).toBe(
        constants.AGREEMENT_REFERENCE + agreementId + constants.FULL_STOP
      )
    })

    it('should have help section', async () => {
      const headingText = await offerAcceptedPage.getIfYouNeedHelpHeading()
      expect(headingText).toBe('If you need help')
    })

    it('should display the RPA support contact information', async () => {
      await expect($('li=Phone: 03000 200 301')).toBeDisplayed()

      await expect(
        $('li=Monday to Friday, 8:30am to 5pm (except bank holidays)')
      ).toBeDisplayed()

      const callChargesLink = await $('a*=Find out about call charges')

      await expect(callChargesLink).toBeDisplayed()

      const emailLink = await $('a=ruralpayments@defra.gov.uk')

      await expect(emailLink).toBeDisplayed()

      await expect(emailLink).toHaveAttribute(
        'href',
        'mailto:ruralpayments@defra.gov.uk'
      )

      await expect(
        $('p=The RPA responds to email queries within 10 working days.')
      ).toBeDisplayed()
    })

    it('should have agreement document link', async () => {
      const link = await offerAcceptedPage.getAgreementDocumentLink()
      await expect(link).toHaveAttribute(
        'href',
        path.join(browser.options.proxy, agreementId),
        {
          atStart: true
        }
      )
    })

    it('should have Capital grants agreements: terms and conditions 2026 link', async () => {
      const link = await offerAcceptedPage.getWoodlandManagementPlanLink()
      await expect(link).toHaveAttribute(
        'href',
        'https://www.gov.uk/government/publications/capital-grants-agreements-terms-and-conditions-2026',
        { atStart: true }
      )
    })
  })
})
