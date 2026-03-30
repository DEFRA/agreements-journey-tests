export const REVIEW_FUNDING_OFFER_TITLE = 'Review your agreement offer - GOV.UK'
export const WITHDRAW_OFFER_TITLE =
  'You have requested an update to your offer - GOV.UK'
export const AGREEMENT_ENDED_TITLE = 'Agreement ended - GOV.UK'
export const EXPECTED_PARCEL = 'SK0971 7555'
export const EXPECTED_AREA = '5.2182'
export const EXPECTED_PARCEL_TWO = 'SK0971 9194'
export const EXPECTED_AREA_TWO = '2.1703'
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
    rate: '£10.60 per ha',
    firstPayment: '£12.63',
    subsequentPayments: '£12.60',
    yearlyPayment: '£50.43'
  },
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    rate: '£10.60 per ha',
    firstPayment: '£5.76',
    subsequentPayments: '£5.75',
    yearlyPayment: '£23.01'
  },
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    rate: '£272 per agreement',
    firstPayment: '£68',
    subsequentPayments: '£68',
    yearlyPayment: '£272'
  },
  {
    action: 'Moderate livestock grazing on moorland',
    code: 'UPL1',
    rate: '£35 per ha',
    firstPayment: '£19',
    subsequentPayments: '£18.99',
    yearlyPayment: '£75.97'
  },
  {
    action: 'Limited livestock grazing on moorland',
    code: 'UPL3',
    rate: '£111 per ha',
    firstPayment: '£132.02',
    subsequentPayments: '£132.02',
    yearlyPayment: '£528.08'
  }
]

export const DEFAULT_TOTAL_FIRST_PAYMENT = '£237.41'
export const DEFAULT_TOTAL_SUBSEQUENT_PAYMENT = '£237.36'
export const DEFAULT_TOTAL_YEARLY_PAYMENT = '£949.49'
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
export const OFFER_ACCEPTED_TITLE = 'Offer accepted - GOV.UK'
export const OFFER_ACCEPTED_HEADER = 'Agreement offer accepted'
export const TERMINATE_HEADER = 'Agreement ended'
export const START_DATE = 'The start date for this agreement is'
export const END_DATE = 'This agreement ended early on'
export const AGREEMENT_REFERENCE = 'Your agreement number is '
export const FULL_STOP = '.'
export const HELP_TEXT =
  'You can contact the Rural Payments Agency (RPA) by phone or email for help and support.'
export const DEFAULT_ADDRESS =
  'Benbrigge House, ALBRIGHTON, BRIDGE ROAD, GRIMSBY, DY13 0UY'
export const DEFAULT_AGREEMENT_NAME = 'Texels Hire & Contracting FPTT'
export const SUB_HEADERS = [
  { element: 'introSubHeader', expected: '1. Introduction and overview' },
  { element: 'partiesSubHeader', expected: '2. Parties to the agreement' },
  { element: 'landSubHeader', expected: '3. Land covered by the agreement' },
  { element: 'actionsSubHeader', expected: '4. Summary of actions' },
  { element: 'paymentSubHeader', expected: '5. Payments' },
  { element: 'scheduleSubHeader', expected: '6. Agreement duration' },
  { element: 'signatureSubHeader', expected: '7. Electronic signature' },
  { element: 'protectionSubHeader', expected: '8. Data protection' }
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
  { element: 'contentsPaymentLink', expected: '5. Payments' },
  { element: 'contentsScheduleLink', expected: '6. Agreement duration' },
  { element: 'contentsSignatureLink', expected: '7. Electronic signature' },
  { element: 'contentsProtectionLink', expected: '8. Data protection' }
]

export const USERNAME = '1102838829'
export const PASSWORD = process.env.DEFRA_ID_USER_PASSWORD
export const AGREEMENT_NAME = 'Farm payments technical test agreement document'
// --- Scenario 1: SSSI & HEFER Combined ---
export const SSSI_HEFER_COMBINED_HEADING =
  'You must get consent to do your actions'
export const SSSI_HEFER_COMBINED_BODY =
  "You are applying for actions on land that's a site of special scientific interest (SSSI) and land with historic or archaeological features."
export const HEFER_LINK_TEXT =
  'Historic Environment Farm Environment Record (HEFER)'
export const SSSI_CONSENT_LINK_TEXT = 'SSSI consent'

// --- Scenario 2: SSSI Only ---
export const SSSI_ONLY_HEADING = 'You must have SSSI consent'
export const SSSI_ONLY_BODY =
  "You are applying for actions on land that's a site of special scientific interest (SSSI). You must get SSSI consent from Natural England."
export const SSSI_ONLY_LINK =
  'Read the guidance on SSSI consent (opens in new tab).'

// --- Scenario 3: HEFER Only ---
export const HEFER_ONLY_HEADING =
  'You must get an SFI Historic Environment Farm Environment Record (SFI HEFER) from Historic England'
export const HEFER_ONLY_BODY =
  'This is because you are applying for actions on land with historic or archaeological features. You must do this before you do your selected SFI actions on this land.'
export const HEFER_ONLY_LINK =
  'Read the guidance on land with historic or archaeological features (opens in new tab)'
