import { jwtVerify, SignJWT } from 'jose'
import { JWTPayload } from '@/types/auth'
import { ObjectId } from 'mongoose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

// Ensure you only pass plain serializable values to the payload
type UserForJWT = { id: ObjectId | number; username: string; email: string; role?: string }

export async function signJWT(user: UserForJWT, expiresIn: string = '7d') {
  const payload: JWTPayload = {
    id: user.id.toString(),
    email: user.email,
    username: user.username,
    role: user.role === 'admin' ? 'admin' : 'user',
  }

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret)
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, secret)
  return payload as JWTPayload
}
