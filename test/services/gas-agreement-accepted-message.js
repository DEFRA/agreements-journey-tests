import { request } from 'undici'
import { browser } from '@wdio/globals'

export async function getGasAgreementAcceptedMessage(agreementId) {
  const url = `${browser.options.baseUrl}/api/test/gas-agreement-accepted-message?agreementId=${agreementId}`
  console.debug('Get agreement request URL:', url)
  const requestOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }
  console.debug(
    'gas-agreement-accepted request options:',
    JSON.stringify(requestOptions, null, 2)
  )
  const response = await request(url, requestOptions)
  console.debug('Get agreement response status code:', response.statusCode)
  const responseBody = await response.body.json()
  console.debug(
    'gas-agreement-accepted response body:',
    JSON.stringify(responseBody, null, 2)
  )
  if (response.statusCode !== 200) {
    console.error(`Failed to get gas-agreement-accepted ${agreementId}`)
    throw new Error(
      `Failed to fetch gas-agreement-accepted ${agreementId}. Status: ${response.statusCode}`
    )
  }
  if (
    typeof responseBody !== 'object' ||
    responseBody === null ||
    !responseBody.event ||
    responseBody.event.agreementId !== agreementId
  ) {
    throw new Error(
      `Expected agreement accepted object but got: ${JSON.stringify(responseBody)}`
    )
  }
  return responseBody
}
