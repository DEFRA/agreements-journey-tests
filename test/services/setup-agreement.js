import { request } from 'undici'
import { browser } from '@wdio/globals'
import { buildAgreementPayload } from '~/test/support/agreementPayloadBuilder.js'

export async function setupAgreement(
  { data: payloadOverrides = {} },
  basePayload
) {
  console.log('setupAgreement:payloadOverrides:', payloadOverrides)
  const requestBody = buildAgreementPayload(
    { data: payloadOverrides },
    basePayload
  )

  const headers = {
    Accept: 'application/json',
    'Accept-Encoding': '*'
  }
  if (process.env.USER_TOKEN) {
    headers['x-api-key'] = process.env.USER_TOKEN
  }
  const url = `${browser.options.testAPIEndPointUrl}/api/test/queue-message`
  console.debug('Create agreement request URL:', url)
  console.debug(
    'Create agreement request body:',
    JSON.stringify(requestBody, null, 2)
  )
  try {
    const response = await request(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    })
    const raw = await response.body.text()
    let responseBody
    try {
      responseBody = JSON.parse(raw)
    } catch {
      console.error('Response was not JSON, raw body:', raw)
      throw new Error(`Expected JSON but got: ${raw.slice(0, 200)}`)
    }
    if (response.statusCode !== 200) {
      console.error('Create agreement failed with non-200 status')
      throw new Error(
        `Failed to create test agreement. Status: ${response.statusCode}, Response: ${JSON.stringify(responseBody)}`
      )
    }
    return responseBody.agreementData?.agreementNumber || 'MISSING_ID'
  } catch (error) {
    console.error('Create agreement encountered an error:', error)
    throw error
  }
}
