import { request } from 'undici'
import { browser } from '@wdio/globals'

export async function unacceptAgreement(agreementId) {
  const url = `${browser.options.testAPIEndPointUrl}/api/test/unaccept-offer/${agreementId}`
  console.debug('Unaccept agreement request URL:', url)
  const headers = {
    Accept: 'application/json',
    'Accept-Encoding': '*'
  }
  if (process.env.USER_TOKEN) {
    headers['x-api-key'] = process.env.USER_TOKEN
  }
  const requestOptions = {
    method: 'POST',
    headers
  }
  console.debug(
    'Unaccept agreement request options:',
    JSON.stringify(requestOptions, null, 2)
  )
  const response = await request(url, requestOptions)
  console.debug('Unaccept agreement response status code:', response.statusCode)
  const responseBody = await response.body.json()
  console.debug(
    'Unaccept agreement response body:',
    JSON.stringify(responseBody, null, 2)
  )
  if (response.statusCode !== 200) {
    console.error(`Failed to unaccept agreement ${agreementId}`)
    throw new Error(
      `Failed to unaccept agreement ${agreementId}. Status: ${response.statusCode}`
    )
  }
  if (responseBody.message !== 'Offer unaccepted') {
    console.error('Unexpected response message:', responseBody.message)
    throw new Error(`Unexpected response message: ${responseBody.message}`)
  }
  return responseBody
}
