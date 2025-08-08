import { faker } from '@faker-js/faker'
import { setupAgreement } from '../services/setup-agreement.js'

export async function createTestAgreement() {
  const sbi = '106284736' // fixed to hardcode sbi for auth verification- faker.string.numeric(10)
  const frn = faker.string.numeric(10)
  const clientRef = 'ref-e2e-001'
  const agreementName = 'E2E Agreement Test Farm'
  const agreementId = await setupAgreement({
    sbi,
    frn,
    agreementName,
    clientRef
  })
  return { agreementId, sbi, frn, clientRef, agreementName }
}
