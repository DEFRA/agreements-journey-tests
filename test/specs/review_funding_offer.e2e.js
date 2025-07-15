import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js' // ✅ relative path
import { OfferAcceptedPage } from 'page-objects/offer-accepted.page.js'
import { unacceptAgreement } from '../services/unaccept-agreement.js'

const reviewOfferPage = new ReviewOfferPage() // ✅ manual instantiation
const offerAcceptedPage = new OfferAcceptedPage()
const defaultAgreementId = 'SFI999999999'

describe('Given the applicant is authenticated', () => {
  describe('When the applicant navigate to their “Review your funding offer” page', () => {
    before(async () => {
      try {
        await unacceptAgreement(defaultAgreementId)
      } catch (e) {
        console.warn('making sure agreement is setup for use')
      }
      await reviewOfferPage.open(defaultAgreementId)
    })

    it('Then should show the title', async () => {
      await expect(browser).toHaveTitle('Review funding offer')
    })

    it('Then should show the Farm Details', async () => {
      expect(await reviewOfferPage.getFarmName()).toBe('Agile Farm')
      expect(await reviewOfferPage.getSBI()).toBe(
        'Single business identifier (SBI): 999999999'
      )
      expect(await reviewOfferPage.getFarmerName()).toBe('Alfred Waldron')
    })

    it('Then should show Header', async () => {
      expect(await reviewOfferPage.getPageHeader()).toBe(
        'Review your funding offer'
      )
    })

    it('Then should show Actions table details correctly', async () => {
      const expectedActionTableData = [
        {
          action: 'Assess moorland and produce a written record',
          code: 'CMOR1',
          parcel: 'SO3757 3159',
          quantity: '8.3405'
        },
        {
          action: 'Limited livestock grazing on moorland',
          code: 'UPL3',
          parcel: 'SO3757 3159',
          quantity: '8.3405'
        },
        {
          action:
            'Keep cattle and ponies on moorland supplement (minimum 30% GLU)',
          code: 'UPL4',
          parcel: 'SO3757 3159',
          quantity: '8.3405'
        },
        {
          action:
            'Keep native breeds on extensively managed habitats supplement (more than 80%)',
          code: 'SPM5',
          parcel: 'SO3757 3159',
          quantity: '8.3405'
        },
        {
          action:
            'Shepherding livestock on moorland (remove stock for at least 8 months)',
          code: 'UPL10',
          parcel: 'SO3757 3159',
          quantity: '8.3405'
        }
      ]

      for (let i = 0; i < expectedActionTableData.length; i++) {
        const rowIndex = i + 1
        const rowData = await reviewOfferPage.getActionTableRowData(rowIndex)
        expect(rowData.action).toBe(expectedActionTableData[i].action)
        expect(rowData.code).toBe(expectedActionTableData[i].code)
        expect(rowData.parcel).toBe(expectedActionTableData[i].parcel)
        expect(rowData.quantity).toBe(expectedActionTableData[i].quantity)
      }
    })

    it('Then should show the Payment table details correctly', async () => {
      const expectedPaymentsData = [
        {
          action: 'Assess moorland and produce a written record',
          code: 'CMOR1',
          rate: '£10.60',
          quarterlyPayment: '',
          yearlyPayment: '£360.41'
        },
        {
          action: 'Limited livestock grazing on moorland',
          code: 'UPL3',
          rate: '£66.00',
          quarterlyPayment: '',
          yearlyPayment: '£550.47'
        },
        {
          action:
            'Keep cattle and ponies on moorland supplement (minimum 30% GLU)',
          code: 'UPL4',
          rate: '£27.00',
          quarterlyPayment: '',
          yearlyPayment: '£58.39'
        },
        {
          action:
            'Keep native breeds on extensively managed habitats supplement (more than 80%)',
          code: 'SPM5',
          rate: '£21.00',
          quarterlyPayment: '',
          yearlyPayment: '£91.75'
        },
        {
          action:
            'Shepherding livestock on moorland (remove stock for at least 8 months)',
          code: 'UPL10',
          rate: '£48.00',
          quarterlyPayment: '',
          yearlyPayment: '£400.34'
        }
      ]

      for (let i = 0; i < expectedPaymentsData.length; i++) {
        const rowIndex = i + 1
        const rowData = await reviewOfferPage.getPaymentsTableRowData(rowIndex)
        expect(rowData.action).toBe(expectedPaymentsData[i].action)
        expect(rowData.code).toBe(expectedPaymentsData[i].code)
        expect(rowData.paymentRate).toBe(expectedPaymentsData[i].rate)
        expect(rowData.quarterlyPayment).toBe(
          expectedPaymentsData[i].quarterlyPayment
        )
        expect(rowData.yearlyPayment).toBe(
          expectedPaymentsData[i].yearlyPayment
        )
      }
      expect(await reviewOfferPage.getTotalYearlyPayment()).toBe('£1,461.36')
    })

    it('should continue to next page', async () => {
      await reviewOfferPage.selectContinue()
      const confirmationText = await offerAcceptedPage.getConfirmationText()
      expect(confirmationText).toBe('Offer accepted')
    })
  })
})
