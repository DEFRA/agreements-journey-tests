export const REVIEW_FUNDING_OFFER_TITLE = 'Review funding offer'
export const ACTION_TABLE_DATA = [
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    parcel: 'SO3757 3159',
    quantity: '4.5123 ha'
  },
  {
    action: 'Limited livestock grazing on moorland',
    code: 'UPL3',
    parcel: 'SO3757 3159',
    quantity: '3.5125 ha'
  },
  {
    action: 'Keep cattle and ponies on moorland supplement (minimum 30% GLU)',
    code: 'UPL4',
    parcel: 'SO3757 3159',
    quantity: '3.5125 ha'
  },
  {
    action: 'Keep native breeds on extensively managed habitats supplement (more than 80%)',
    code: 'SPM5',
    parcel: 'SO3757 3159',
    quantity: '3.5125 ha'
  },
  {
    action: 'Shepherding livestock on moorland (remove stock for at least 8 months)',
    code: 'UPL10',
    parcel: 'SO3757 3159',
    quantity: '8.3405 ha'
  }
]
export const PAYMENTS_DATA = [
  {
    action: 'Assess moorland and produce a written record',
    code: 'CMOR1',
    rate: '£10.60',
    quarterlyPayment: '£79.96',
    yearlyPayment: '£319.84'
  },
  {
    action: 'Limited livestock grazing on moorland',
    code: 'UPL3',
    rate: '£66.00',
    quarterlyPayment: '£57.96',
    yearlyPayment: '£231.84'
  },
  {
    action: 'Keep cattle and ponies on moorland supplement (minimum 30% GLU)',
    code: 'UPL4',
    rate: '£7.00',
    quarterlyPayment: '£6.15',
    yearlyPayment: '£24.60'
  },
  {
    action: 'Keep native breeds on extensively managed habitats supplement (more than 80%)',
    code: 'SPM5',
    rate: '£11.00',
    quarterlyPayment: '£9.66',
    yearlyPayment: '£38.64'
  },
  {
    action: 'Shepherding livestock on moorland (remove stock for at least 8 months)',
    code: 'UPL10',
    rate: '£48.00',
    quarterlyPayment: '£100.09',
    yearlyPayment: '£400.34'
  }
]
export const TOTAL_QUARTERLY_PAYMENT = '£253.82'
export const TOTAL_YEARLY_PAYMENT = '£1,015.26'
export const ACCEPT_OFFER_TITLE = 'Accept offer'
export const FARM_NAME = 'Agile Farm'
export const SBI = 'Single business identifier (SBI): 999999999'
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
export const FUNDING_LINK_TEXT = 'Find funding for land or farms'
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
