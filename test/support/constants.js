export const REVIEW_FUNDING_OFFER_TITLE = 'Review your funding offer - GOV.UK'
export const DEFAULT_ACTION_TABLE_DATA = [
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    parcel: 'SD6743 8083',
    quantity: '1.23 ha'
  }
]
export const DEFAULT_ACTION_TABLE_DATA_UPDATED = [
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    parcel: '8083',
    quantity: '2.23 ha'
  }
]
export const DEFAULT_PAYMENTS_DATA = [
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    rate: '£10.60 per ha',
    quarterlyPayment: '£12.01',
    yearlyPayment: '£48.06'
  },
  {
    action:
      'One-off payment per agreement per year for Assess moorland and produce a written record',
    code: 'CMOR1',
    rate: '£272.00',
    quarterlyPayment: '£68.00',
    yearlyPayment: '£272.00'
  }
]
export const DEFAULT_TOTAL_QUARTERLY_PAYMENT = '£80.01'
export const DEFAULT_TOTAL_YEARLY_PAYMENT = '£320.06'
export const ACCEPT_OFFER_TITLE = 'Accept offer - GOV.UK'
export const DEFAULT_FARM_NAME = 'J&S Hartley'
export const SBI = 'Single business identifier (SBI): 999999999'
export const DEFAULT_SBI = 'Single business identifier (SBI): '
export const DEFAULT_FARMER_NAME = 'Edward Jones'
export const FARMER_NAME = 'Alfred Waldron'
export const ACCEPT_OFFER_HEADER = 'Accept your offer'
export const REVIEW_OFFER_HEADER = 'Review your funding offer'
export const OFFER_ACCEPTED_TEXT = 'Offer accepted'
export const BULLET_POINTS = [
  'you are entering into a legally binding agreement with Defra',
  'you and your land will remain eligible for the duration of the actions you have selected',
  'you will get any required regulatory consents, permissions and licences before you do your selected actions',
  expect.stringContaining(
    'you will complete your selected actions by following the guidance'
  ),
  expect.stringContaining(
    'you will submit an annual declaration to confirm you have complied'
  ),
  expect.stringContaining('you will comply with the terms and conditions')
]
export const TERMS_LINK_TEXT = 'terms and conditions'
export const TERMS_LINK_HREF = '#'
export const FUNDING_LINK_TEXT = 'funding for land or farms (opens in new tab)'
export const FUNDING_LINK_HREF =
  'https://www.gov.uk/find-funding-for-land-or-farms'
export const GUIDANCE_DETAILS_TEXT =
  'Contact the Rural Payments Agency to update your offer'
export const CONTACT_CENTRE_NUMBER = '03000 200 301'
export const CALL_CHARGES_TEXT = 'Find out about call charges'
export const CALL_CHARGES_HREF = '#'
export const HREF = 'href'
export const TARGET = 'target'
export const DEFAULT_AGREEMENT_ID = 'SFI999999999'
export const OFFER_ACCEPTED_TITLE = 'Offer accepted - GOV.UK'
export const OFFER_ACCEPTED_HEADER = 'Offer accepted'
export const START_DATE = 'The start date for these actions is '
export const AGREEMENT_REFERENCE = 'Your agreement number is '
export const FULL_STOP = '.'
export const HELP_TEXT =
  'You can contact the Rural Payments Agency (RPA) by phone or email for help and support.'
export const DEFAULT_ADDRESS =
  'Mason House Farm Clitheroe Rd, Bashall Eaves, Bartindale Road, Clitheroe, BB7 3DD'
export const DEFAULT_AGREEMENT_NAME = 'E2E Agreement Test Farm'
export const SUB_HEADERS = [
  { element: 'introSubHeader', expected: '1. Introduction and overview' },
  { element: 'partiesSubHeader', expected: '2. Parties to the agreement' },
  { element: 'landSubHeader', expected: '3. Land covered by the agreement' },
  { element: 'actionsSubHeader', expected: '4. Summary of actions' },
  { element: 'paymentSubHeader', expected: '5. Summary of payments' },
  { element: 'scheduleSubHeader', expected: '6. Payment schedule' },
  { element: 'protectionSubHeader', expected: '7. Data protection' }
]
export const USERNAME = '1102838829'
export const PASSWORD = process.env.DEFRA_ID_USER_PASSWORD
export const FARM_NAME = 'E2E Agreement Test Farm'
