import { faker } from '@faker-js/faker'
import { setupAgreement } from '../services/setup-agreement.js'
import { sendWithdrawnOffer } from '../services/withdraw-offer.js'

export async function withdrawOffer(clientRef, agreementNumber) {
  await sendWithdrawnOffer(clientRef, agreementNumber)
}

export async function createTestAgreement(clientRef = 'ref-e2e-001') {
  let sbi = faker.string.numeric(10)
  const isParallelRun = process.env.PARALLEL_RUN === 'true'
  if (!isParallelRun) {
    sbi = '106284736'
  }
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

export function getQuarterAfterMonths(monthsToAdd = 4) {
  const date = new Date()
  date.setMonth(date.getMonth() + monthsToAdd)

  const month = date.getMonth() + 1 // JS months are 0-based
  return `Q${Math.ceil(month / 3)}`
}
