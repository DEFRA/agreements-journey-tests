import { faker } from '@faker-js/faker'
import { setupAgreement } from '../services/setup-agreement.js'
import { sendWithdrawnOffer } from '../services/withdraw-offer.js'

export async function withdrawOffer(clientRef, agreementNumber) {
  await sendWithdrawnOffer(clientRef, agreementNumber)
}

export async function createTestAgreement(clientRef = 'ref-e2e-001') {
  const sbi = '106284736' // fixed to hardcode sbi for auth verification- faker.string.numeric(10)
  const frn = faker.string.numeric(10)
  const agreementName = 'E2E Agreement Test Farm'
  const agreementId = await setupAgreement({
    sbi,
    frn,
    agreementName,
    clientRef
  })
  return { agreementId, sbi, frn, clientRef, agreementName }
}
export async function updateTestAgreement(frn) {
  const sbi = '106284736' // fixed to hardcode sbi for auth verification- faker.string.numeric(10)
  const clientRef = 'ref-e2e-001'
  const agreementName = 'E2E Agreement Test Farm'
  const agreementId = await setupAgreement({
    sbi,
    frn,
    agreementName,
    clientRef,
    postalCode: 'DY14 0UY'
  })
  return { agreementId, sbi, frn, clientRef, agreementName }
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
