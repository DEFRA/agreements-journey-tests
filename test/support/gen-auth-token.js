import * as Jwt from '@hapi/jwt'
import { faker } from '@faker-js/faker'

export const genAuthToken = ({ sbi, source = 'defra' }) => {
  if (!process.env.AGREEMENTS_JWT_SECRET) {
    throw new Error('AGREEMENTS_JWT_SECRET is required')
  }

  return Jwt.token.generate(
    { sbi: sbi || faker.string.numeric(10), source },
    process.env.AGREEMENTS_JWT_SECRET,
    { algorithm: 'HS256' }
  )
}
