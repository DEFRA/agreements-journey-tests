import path from 'node:path'
import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from 'page-objects/accept-your-offer.page.js'
import * as constants from '../../support/constants.js'
import { createTestAgreement } from '../../support/agreement-helper.js'
import { LoginPage } from 'page-objects/login.page.js'
import wmpOffer from '~/test/data/wmp_create_offer.json'

const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const loginPage = new LoginPage()

describe('Given the farmer is authenticated', () => {
  describe('When the farmer navigates to "Review your WMP agreement offer" page', () => {
    let agreementId
    let sbi
    before(async () => {
      // Step 1: Create agreement
      const agreement = await createTestAgreement(wmpOffer)
      agreementId = agreement.agreementId
      sbi = agreement.sbi
      console.log(`Created agreement with ID: ${agreementId}`)
      await loginPage.login(sbi)
    })

    it('Then should show Beta phase banner', async () => {
      expect(await reviewOfferPage.isBetaBannerPresent()).toBe(true)
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle(constants.REVIEW_FUNDING_OFFER_TITLE)
    })

    it('Then should show the Farm Details', async () => {
      const text = await reviewOfferPage.getFarmName()
      expect(text).toContain(constants.WMP_FARM_NAME)
      expect(await reviewOfferPage.getSBI()).toBe(sbi)
      expect(await reviewOfferPage.getFarmerName()).toBe(
        constants.WMP_FARMER_NAME
      )
    })

    it('Then should show Header', async () => {
      expect(await reviewOfferPage.getPageHeader()).toBe(
        constants.REVIEW_OFFER_HEADER
      )
    })

    it('Then should show Privacy link in footer', async () => {
      const privacyLink = await reviewOfferPage.getFooterLinkByText(
        'Privacy (opens in new tab)'
      )

      await expect(privacyLink).toBeExisting()
      await expect(privacyLink).toBeDisplayed()
    })

    it('And should show Cookies link in footer', async () => {
      const cookiesLink = await reviewOfferPage.getFooterLinkByText('Cookies')

      await expect(cookiesLink).toBeExisting()
      await expect(cookiesLink).toBeDisplayed()
    })

    it('should display the Applicant guide link', async () => {
      const applicantsGuideLink = await $(
        'a[href*="applicants-guide-pa3-woodland-management-plan-2026"]'
      )

      await expect(applicantsGuideLink).toBeDisplayed()

      await expect(applicantsGuideLink).toHaveAttribute(
        'href',
        'https://www.gov.uk/government/publications/pa3-woodland-management-plan-2026/applicants-guide-pa3-woodland-management-plan-2026'
      )
    })

    it('should display the Capital grants terms and conditions link', async () => {
      const termsAndConditionsLink = await $(
        'a[href*="capital-grants-agreements-terms-and-conditions-2026"]'
      )

      await expect(termsAndConditionsLink).toBeDisplayed()

      await expect(termsAndConditionsLink).toHaveAttribute(
        'href',
        'https://www.gov.uk/government/publications/capital-grants-agreements-terms-and-conditions-2026/capital-grants-agreements-terms-and-conditions-2026'
      )
    })

    it('should display the Agreement holder guide link', async () => {
      const agreementHolderGuideLink = await $(
        'a[href*="agreement-holders-guide-pa3-woodland-management-plan-2026"]'
      )

      await expect(agreementHolderGuideLink).toBeDisplayed()

      await expect(agreementHolderGuideLink).toHaveAttribute(
        'href',
        'https://www.gov.uk/government/publications/pa3-woodland-management-plan-2026/agreement-holders-guide-pa3-woodland-management-plan-2026'
      )
    })

    it('should have draft agreement link', async () => {
      const link = await reviewOfferPage.getDraftAgreementLink()
      await expect(link).toHaveAttribute(
        'href',
        path.join(browser.options.proxy, agreementId, 'print'),
        { atStart: true }
      )
    })

    it('Then should display the actions table details correctly', async () => {
      const expectedActionsData = [
        {
          action: 'Produce a woodland management plan',
          code: 'WMP1',
          grantPaymentAmount: '£1,575'
        }
      ]

      for (let i = 0; i < expectedActionsData.length; i++) {
        const rowIndex = i + 1
        const rowData = await reviewOfferPage.getActionsTableRowData(rowIndex)

        expect(rowData.action).toBe(expectedActionsData[i].action)
        expect(rowData.code).toBe(expectedActionsData[i].code)
        expect(rowData.grantPaymentAmount).toBe(
          expectedActionsData[i].grantPaymentAmount
        )
      }
    })
    it('should continue to next page', async () => {
      await reviewOfferPage.selectContinue()
      // eslint-disable-next-line wdio/no-pause
      browser.pause(2000)
      expect(await acceptYourOfferPage.getPageHeader()).toBe(
        constants.ACCEPT_OFFER_HEADER
      )
    })
  })
})
