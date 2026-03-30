import { request } from 'undici'
import { browser } from '@wdio/globals'
import { faker } from '@faker-js/faker'

export async function sendCancelledOffer(clientRef, agreementNumber) {
  const url = `${browser.options.testAPIEndPointUrl}/api/test/queue-message/update_agreement_fifo.fifo`
  console.debug('Send GAS application status update request URL:', url)
  const headers = {
    Accept: 'application/json',
    'Accept-Encoding': '*'
  }
  if (process.env.USER_TOKEN) {
    headers['x-api-key'] = process.env.USER_TOKEN
  }
  const payload = {
    id: faker.string.uuid(),
    source: 'fg-gas-backend',
    specVersion: '1.0',
    type: 'cloud.defra.test.fg-gas-backend.agreement.cancelled',
    datacontenttype: 'application/json',
    data: {
      clientRef,
      agreementNumber,
      id: faker.string.uuid(),
      status: 'cancelled',
      cancelledBy: 'Caseworker_ID_123',
      cancelledAt: '2025-03-27T14:30:00Z'
    }
  }

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }

  console.debug(
    'Send GAS application status update request options:',
    JSON.stringify(requestOptions, null, 2)
  )

  const response = await request(url, requestOptions)
  console.debug(
    'Send GAS application status update response status code:',
    response.statusCode
  )

  const responseBody = await response.body.json().catch(() => ({}))
  console.debug(
    'Send GAS application status update response body:',
    JSON.stringify(responseBody, null, 2)
  )

  if (response.statusCode !== 200) {
    console.error(`Failed to send GAS application status update`)
    throw new Error(
      `Failed to send GAS application status update. Status: ${response.statusCode}`
    )
  }

  return responseBody
}
