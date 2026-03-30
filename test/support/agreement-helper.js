import { faker } from '@faker-js/faker'
import { setupAgreement } from '../services/setup-agreement.js'
import { sendWithdrawnOffer } from '../services/withdraw-offer.js'
import { sendCancelledOffer } from '../services/cancelled-offer.js'
import { sendTerminateOffer } from '../services/terminate-offer.js'

export async function withdrawOffer(clientRef, agreementNumber) {
  await sendWithdrawnOffer(clientRef, agreementNumber)
}

export async function cancelOffer(clientRef, agreementNumber) {
  await sendCancelledOffer(clientRef, agreementNumber)
}

export async function terminateOffer(clientRef, agreementNumber) {
  await sendTerminateOffer(clientRef, agreementNumber)
}

export async function createTestAgreement(basePayload) {
  let sbi = faker.string.numeric(10)
  const isParallelRun = process.env.PARALLEL_RUN === 'true'
  let frn = faker.string.numeric(10)
  if (!isParallelRun) {
    sbi = '106284736'
    frn = '7282807759'
  }

  const agreementName = 'E2E Agreement Test Farm'

  const agreementId = await setupAgreement(
    {
      data: {
        identifiers: {
          sbi,
          frn
        }
      }
    },
    basePayload
  )
  console.log(`Creating test agreement ${agreementId}`)
  return { agreementId, sbi, frn, agreementName }
}

export async function updateTestAgreement(frn) {
  const sbi = '106284736' // fixed for auth verification
  const clientRef = 'ref-e2e-001'
  const agreementName = 'E2E Agreement Test Farm'

  const agreementId = await setupAgreement({
    data: {
      clientRef,
      identifiers: {
        sbi,
        frn
      },
      answers: {
        applicant: {
          business: {
            name: agreementName,
            address: {
              postalCode: 'DY14 0UY'
            }
          }
        }
      }
    }
  })

  return { agreementId, sbi, frn, clientRef, agreementName }
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getQuarterAfterMonths(monthsToAdd = 4) {
  const date = new Date()
  date.setMonth(date.getMonth() + monthsToAdd)

  const month = date.getMonth() + 1
  return `Q${Math.ceil(month / 3)}`
}
