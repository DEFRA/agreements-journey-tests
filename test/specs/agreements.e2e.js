import { addArgument as addAllureArgument } from '@wdio/allure-reporter'
import { browser, expect } from '@wdio/globals'
import { AgreementsPage } from '../page-objects/agreements.page.js' // ✅ relative path

const agreementsPage = new AgreementsPage() // ✅ manual instantiation

describe('Agreements Page - Post Application Submission', () => {
  before(async () => {
    addAllureArgument(
      'logName',
      browser.options.capabilities['wdio-ics:options'].logName
    )
    await agreementsPage.open()
  })

  it('should redirect the farmer to the "Agreements" page', async () => {
    await expect(browser).toHaveTitle(
      'GOV.UK - The best place to find government services and information'
    )
  })

  it('should display all relevant section headings', async () => {
    const expectedSectionHeaderText = [
      'Table of Contents',
      '1. Introduction and Overview',
      '2. Parties to the Agreement',
      '3. Agreement Land',
      '4. Summary of parcel based SFI Actions',
      '5. Summary of agreement level actions',
      '6. Summary of payments',
      '7. Annual Payment Schedule',
      '8. Agreement Period',
      '9. Electronic signature',
      'Data Protection'
    ]

    for (
      let sectionNumber = 2, i = 0;
      sectionNumber <= 12;
      sectionNumber++, i++
    ) {
      const actualHeader = await agreementsPage.getSectionText(sectionNumber)
      expect(actualHeader).toBe(expectedSectionHeaderText[i])
    }
  })

  it('should display correct Agreement Period details', async () => {
    const startDateText = await agreementsPage.getAgreementPeriodText(
      'Agreement Start Date'
    )
    const endDateText =
      await agreementsPage.getAgreementPeriodText('Agreement End Date')

    expect(startDateText).toBe('Agreement Start Date: 01/11/2024')
    expect(endDateText).toBe('Agreement End Date: 31/10/2027')
  })

  it('should display the correct totals in Annual Payment Schedule', async () => {
    const expectedTotals = [
      'Total',
      '£4,365.45',
      '£4,126.07',
      '£4,126.07',
      '£12,617.59'
    ]
    const actualTotals = await agreementsPage.getAnnualPaymentScheduleTotalRow()
    expect(actualTotals).toEqual(expectedTotals)
  })

  const expectedKeyDetails = {
    'Agreement Document Type:': 'SFI',
    'Agreement Number:': 'SFI123456789',
    'Agreement Name:': 'Sample Agreement',
    'Agreement Start Date:': '01/11/2024',
    'Agreement End Date:': '31/10/2027',
    'SBI:': '123456789',
    'Agreement Holder:': 'Sample Farm Ltd',
    'Address:': '123 Farm Lane, Farmville',
    'Postcode:': 'FA12 3RM'
  }

  for (const [label, expectedValue] of Object.entries(expectedKeyDetails)) {
    it(`should display correct value for "${label}"`, async () => {
      const actualValue = await agreementsPage.getAgreementKeyDetailValue(label)
      expect(actualValue).toBe(expectedValue)
    })
  }
})
