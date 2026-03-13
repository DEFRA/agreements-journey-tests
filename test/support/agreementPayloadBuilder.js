import { randomUUID } from 'crypto'
import payloadCreateOffer from '../data/default_create_offer.json'

/**
 * Merges overrides into a provided base payload or the default template.
 * @param {Object} overrides - Nested overrides to apply.
 * @param {Object} basePayload - The starting JSON structure (defaults to imported payloadCreateOffer).
 */
export function buildAgreementPayload(
  overrides = {},
  basePayload = payloadCreateOffer
) {
  const payload = {
    ...basePayload,
    id: randomUUID(),
    time: new Date().toISOString()
  }
  payload.source = 'fg-gas-backend'
  payload.specversion = '1.0'
  payload.type = 'cloud.defra.dev.fg-gas-backend.agreement.create'
  return deepMerge(payload, overrides)
}

/**
 * A standard recursive merge that handles nested objects.
 */
function deepMerge(target, source) {
  const isObject = (obj) =>
    obj && typeof obj === 'object' && !Array.isArray(obj)
  if (!isObject(target) || !isObject(source)) {
    return source
  }
  const output = { ...target }
  Object.keys(source).forEach((key) => {
    const targetValue = output[key]
    const sourceValue = source[key]

    if (isObject(targetValue) && isObject(sourceValue)) {
      output[key] = deepMerge(targetValue, sourceValue)
    } else {
      output[key] = sourceValue
    }
  })

  return output
}
