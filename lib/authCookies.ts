import { serialize } from "cookie";

export function createCookie(token: string) {
  return serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}
