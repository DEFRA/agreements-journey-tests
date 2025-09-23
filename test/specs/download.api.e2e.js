import { browser, expect } from '@wdio/globals'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from 'page-objects/accept-your-offer.page.js'
import { createTestAgreement } from '~/test/support/agreement-helper.js'
import { LoginPage } from 'page-objects/login.page.js'

const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const loginPage = new LoginPage()

describe('Download API validation', function () {
  this.timeout(70000)
  let agreementId

  before(async function () {
    const agreement = await createTestAgreement()
    agreementId = agreement.agreementId
    console.log(`Created offer with ID: ${agreementId}`)
    await loginPage.login(agreementId)
    await reviewOfferPage.selectContinue()
    await acceptYourOfferPage.selectAcceptOffer()
  })

  it('should return a valid file with correct headers', async function () {
    // eslint-disable-next-line wdio/no-pause
    await browser.pause(60000)

    const downloadUrl = `${browser.options.testAPIEndPointUrl}/${agreementId}/1/download`
    const token = process.env.TOKEN_SECRET_KEY

    if (!token)
      throw new Error('Missing TOKEN_SECRET_KEY in environment variables')

    console.log(`Downloading from URL: ${downloadUrl}`)
    console.log(`Using token: ${token}`)

    const resp = await fetch(downloadUrl, {
      method: 'GET',
      headers: { 'x-encrypted-auth': token }
    })
    expect(resp.status).toBe(200)
    const contentType = resp.headers.get('content-type')
    expect(contentType).toContain('application')
    const buffer = await resp.arrayBuffer()
    expect(buffer.byteLength).toBeGreaterThan(0)
    const fileSignature = Buffer.from(buffer).toString('utf8', 0, 4)
    expect(fileSignature).toBe('%PDF')
    console.log('API validation OK:', {
      status: resp.status,
      contentType,
      bodyLength: buffer.byteLength
    })
  })
})
