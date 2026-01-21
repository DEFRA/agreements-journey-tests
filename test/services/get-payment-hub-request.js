import { request } from 'undici'
import { browser } from '@wdio/globals'

export async function getPaymentHubRequest(agreementId) {
  const url = `${browser.options.testAPIEndPointUrl}/api/test/invoice?agreementNumber=${agreementId}`
  console.debug('Get payment hub request URL:', url)

  const headers = {
    Accept: 'application/json',
    'Accept-Encoding': '*'
  }

  if (process.env.USER_TOKEN) {
    headers['x-api-key'] = process.env.USER_TOKEN
  }

  const response = await request(url, { method: 'GET', headers })
  const responseBody = await response.body.json()

  console.debug('Get Payment Hub response status:', response.statusCode)
  console.debug(
    'Get Payment Hub response body:',
    JSON.stringify(responseBody, null, 2)
  )

  if (response.statusCode !== 200) {
    throw new Error(
      `Failed to fetch payment hub request for agreement ${agreementId}`
    )
  }
  return responseBody
}
