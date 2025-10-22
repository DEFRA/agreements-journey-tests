import { request } from 'undici'
import { browser } from '@wdio/globals'

export async function getAgreement(agreementId) {
  const url = `${browser.options.testAPIEndPointUrl}/api/test/agreement?id=${agreementId}`
  console.debug('Get agreement request URL:', url)
  const headers = {
    Accept: 'application/json',
    'Accept-Encoding': '*'
  }
  if (process.env.USER_TOKEN) {
    headers['x-api-key'] = process.env.USER_TOKEN
  }
  const requestOptions = {
    method: 'GET',
    headers
  }
  console.debug(
    'Get agreement request options:',
    JSON.stringify(requestOptions, null, 2)
  )
  const response = await request(url, requestOptions)
  console.debug('Get agreement response status code:', response.statusCode)
  const responseBody = await response.body.json()
  console.debug(
    'Get agreement response body:',
    JSON.stringify(responseBody, null, 2)
  )
  if (response.statusCode !== 200) {
    console.error(`Failed to fetch agreement ${agreementId}`)
    throw new Error(
      `Failed to fetch agreement ${agreementId}. Status: ${response.statusCode}`
    )
  }
  if (!Array.isArray(responseBody) || responseBody.length === 0) {
    throw new Error(
      `Expected agreement array but got: ${JSON.stringify(responseBody)}`
    )
  }
  return responseBody[0]
}
