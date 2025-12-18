export const REVIEW_FUNDING_OFFER_TITLE = 'Review your agreement offer - GOV.UK'
export const WITHDRAW_OFFER_TITLE =
  'You have requested an update to your offer - GOV.UK'
export const EXPECTED_PARCEL = 'SK0971 7555'
export const EXPECTED_AREA = '4.7575'
export const EXPECTED_PARCEL_TWO = 'SK0971 9194'
export const EXPECTED_AREA_TWO = '2.1705'
export const DEFAULT_ACTION_TABLE_DATA = [
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    parcel: 'SK0971 7555',
    quantity: '4.7575',
    duration: '1 year'
  },
  {
    action: 'Limited livestock grazing on moorland',
    code: 'UPL3',
    parcel: 'SK0971 7555',
    quantity: '4.7575',
    duration: '1 year'
  },
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    parcel: 'SK0971 9194',
    quantity: '2.1705',
    duration: '1 year'
  },
  {
    action: 'Moderate livestock grazing on moorland',
    code: 'UPL1',
    parcel: 'SK0971 9194',
    quantity: '2.1705',
    duration: '1 year'
  }
]
export const DEFAULT_ACTION_TABLE_DATA_UPDATED = [
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    parcel: '8083',
    quantity: '2.23',
    duration: '1 year'
  }
]
export const DEFAULT_PAYMENTS_DATA = [
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    rate: '£10.60  per ha',
    firstPayment: '£12.63',
    subsequentPayments: '£12.60',
    yearlyPayment: '£50.43'
  },
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    rate: '£10.60  per ha',
    firstPayment: '£5.76', // updated
    subsequentPayments: '£5.75',
    yearlyPayment: '£23.01'
  },
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    rate: '£272.00 per agreement',
    firstPayment: '£68.00',
    subsequentPayments: '£68.00',
    yearlyPayment: '£272.00'
  },
  {
    action: 'Moderate livestock grazing on moorland',
    code: 'UPL1',
    rate: '£20.00  per ha',
    firstPayment: '£10.86', // updated
    subsequentPayments: '£10.85',
    yearlyPayment: '£43.41'
  },
  {
    action: 'Limited livestock grazing on moorland',
    code: 'UPL3',
    rate: '£66.00  per ha',
    firstPayment: '£78.50',
    subsequentPayments: '£78.50',
    yearlyPayment: '£314.00'
  }
]

export const DEFAULT_TOTAL_FIRST_PAYMENT = '£175.75'
export const DEFAULT_TOTAL_SUBSEQUENT_PAYMENT = '£175.70'
export const DEFAULT_TOTAL_YEARLY_PAYMENT = '£702.85'
export const ACCEPT_OFFER_TITLE = 'Accept your agreement offer - GOV.UK'
export const DEFAULT_FARM_NAME = 'Texels Hire & Contracting'
export const SBI = 'Single business identifier (SBI):'
export const DEFAULT_SBI = 'Single business identifier (SBI): '
export const DEFAULT_FARMER_NAME = 'Graham Gilfoyle'
export const FARMER_NAME = 'Alfred Waldron'
export const ACCEPT_OFFER_HEADER = 'Accept your agreement offer'
export const REVIEW_OFFER_HEADER = 'Review your agreement offer'
export const OFFER_ACCEPTED_TEXT = 'Agreement offer accepted'
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
  'Contact the Rural Payments Agency (RPA) by phone or email for help and support.'
export const CONTACT_CENTRE_NUMBER = '020 8026 2395'
export const CONTACT_CENTRE_EMAIL = 'farmpayments@rpa.gov.uk'
export const CALL_CHARGES_TEXT = 'Find out about call charges'
export const CALL_CHARGES_HREF = '#'
export const HREF = 'href'
export const TARGET = 'target'
export const DEFAULT_AGREEMENT_ID = 'SFI999999999'
export const OFFER_ACCEPTED_TITLE = 'Offer accepted - GOV.UK'
export const OFFER_ACCEPTED_HEADER = 'Agreement offer accepted'
export const START_DATE = 'The start date for this agreement is'
export const AGREEMENT_REFERENCE = 'Your agreement number is '
export const FULL_STOP = '.'
export const HELP_TEXT =
  'You can contact the Rural Payments Agency (RPA) by phone or email for help and support.'
export const DEFAULT_ADDRESS =
  'Benbrigge House, ALBRIGHTON, BRIDGE ROAD, GRIMSBY, DY13 0UY'
export const DEFAULT_AGREEMENT_NAME = 'Sustainable Farming Incentive agreement'
export const SUB_HEADERS = [
  { element: 'introSubHeader', expected: '1. Introduction and overview' },
  { element: 'partiesSubHeader', expected: '2. Parties to the agreement' },
  { element: 'landSubHeader', expected: '3. Land covered by the agreement' },
  { element: 'actionsSubHeader', expected: '4. Summary of actions' },
  { element: 'paymentSubHeader', expected: '5. Summary of payments' },
  { element: 'scheduleSubHeader', expected: '6. Payment schedule' },
  { element: 'protectionSubHeader', expected: '7. Data protection' }
]
export const EXPECTED_CONTENTS = [
  {
    element: 'contentsIntroLink',
    expected: '1. Introduction and overview'
  },
  {
    element: 'contentsPartiesLink',
    expected: '2. Parties to the agreement'
  },
  {
    element: 'contentsLandLink',
    expected: '3. Land covered by the agreement'
  },
  { element: 'contentsActionsLink', expected: '4. Summary of actions' },
  { element: 'contentsPaymentLink', expected: '5. Summary of payments' },
  { element: 'contentsScheduleLink', expected: '6. Payment schedule' },
  { element: 'contentsProtectionLink', expected: '7. Data protection' }
]

export const USERNAME = '1102838829'
export const PASSWORD = process.env.DEFRA_ID_USER_PASSWORD
export const AGREEMENT_NAME = 'Sustainable Farming Incentive agreement'
