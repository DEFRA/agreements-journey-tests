import { request } from 'undici'
import { randomUUID } from 'crypto'
import { browser } from '@wdio/globals'

export async function setupAgreement({
  sbi,
  frn,
  agreementName,
  clientRef,
  quantity = 1.23
}) {
  const requestBody = {
    id: randomUUID(),
    source: 'fg-gas-backend',
    specVersion: '1.0',
    type: 'cloud.defra.dev.fg-gas-backend.application.approved',
    datacontenttype: 'application/json',
    data: {
      clientRef,
      code: 'frps-private-beta',
      createdAt: '2023-10-01T12:00:00Z',
      submittedAt: '2023-10-01T11:00:00Z',
      agreementName,
      identifiers: {
        sbi,
        frn,
        crn: '1234567890',
        defraId: '1234567890'
      },
      answers: {
        scheme: 'SFI',
        year: 2025,
        hasCheckedLandIsUpToDate: true,
        actionApplications: [
          {
            parcelId: '9238',
            sheetId: 'SX0679',
            code: 'CSAM1',
            appliedFor: {
              unit: 'ha',
              quantity
            }
          }
        ]
      }
    }
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })
    const responseBody = await response.body.json()
    console.debug('Create agreement response status:', response.statusCode)
    console.debug(
      'Create agreement response body:',
      JSON.stringify(responseBody, null, 2)
    )
    if (response.statusCode !== 200) {
      console.error('Create agreement failed with non-200 status')
      throw new Error(
        `Failed to create test agreement. Status: ${response.statusCode}, Response: ${JSON.stringify(responseBody)}`
      )
    }
    return responseBody.agreementData?.agreementNumber
  } catch (error) {
    console.error('Create agreement encountered an error:', error)
    throw error
  }
}
