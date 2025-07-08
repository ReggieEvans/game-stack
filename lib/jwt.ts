import { jwtVerify, SignJWT } from "jose";

import { JWTPayload } from "@/types/auth";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signJWT(
  payload: Record<string, any>,
  expiresIn: string = "7d",
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, secret);
  return payload as JWTPayload;
}
