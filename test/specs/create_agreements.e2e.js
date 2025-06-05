import { expect } from '@wdio/globals'
import { AgreementsPage } from '../page-objects/agreements.page.js'
import { setupAgreement } from '../services/setup-agreement.js'
import { getAgreement } from '../services/get-agreement.js'
import { unacceptAgreement } from '../services/unaccept-agreement.js'
import { faker } from '@faker-js/faker'
const agreementsPage = new AgreementsPage()

describe('E2E: Create, Accept,Un-accept and validate agreement', () => {
  let agreementId
  const sbi = faker.string.numeric(10)
  const frn = faker.string.numeric(10)
  const clientRef = 'ref-e2e-001'
  const agreementName = 'E2E Agreement Test Farm'

  before(async () => {
    // Step 1: Create agreement
    agreementId = await setupAgreement({ sbi, frn, agreementName, clientRef })
    console.log(`Created agreement with ID: ${agreementId}`)
    await browser.url(`/agreement/${agreementId}`)
    await agreementsPage.open(agreementId)
  })

  it('should accept the agreement', async () => {
    await agreementsPage.acceptAgreement()
    const confirmationText = await agreementsPage.getAgreementAcceptText()
    expect(confirmationText).toBe('Agreement accepted')
  })

  it('should validate agreement is accepted along with invoice details via API', async () => {
    console.log(`agreement accepted: ${agreementId}`)
    const agreementData = await getAgreement(agreementId)
    expect(agreementData).not.toBeUndefined()
    expect(agreementData).toMatchObject({ sbi, status: 'accepted' })
    expect(agreementData.invoice).toBeDefined()
    expect(agreementData.invoice[0].paymentHubRequest.value).toBe(22.14)
  })

  it('should un-accept the agreement and validate via API', async () => {
    await unacceptAgreement(agreementId) // You need to implement this in your page object
    const agreementData = await getAgreement(agreementId)
    console.log(
      'agreementData after unaccept:-----',
      JSON.stringify(agreementData, null, 2)
    )
    expect(agreementData).toMatchObject({
      sbi,
      status: 'offered'
    })
  })
  it('re-acceptance of agreement and validate via API', async () => {
    await browser.url(`/agreement/${agreementId}`)
    await agreementsPage.open(agreementId)
    await agreementsPage.acceptAgreement()
    const confirmationText = await agreementsPage.getAgreementAcceptText()
    expect(confirmationText).toBe('Agreement accepted')
    const agreementData = await getAgreement(agreementId)
    console.debug(
      'agreementData after accept:-----',
      JSON.stringify(agreementData, null, 2)
    )
    expect(agreementData).not.toBeUndefined()
    expect(agreementData).toMatchObject({ sbi, status: 'accepted' })
    expect(agreementData.invoice).toBeDefined()
    expect(agreementData.invoice[0].paymentHubRequest.value).toBe(22.14)
    expect(agreementData.invoice[1].paymentHubRequest.value).toBe(22.14)
  })
})
