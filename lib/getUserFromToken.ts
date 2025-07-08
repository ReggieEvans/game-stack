import { cookies } from "next/headers";

import { verifyJWT } from "./jwt";

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload = await verifyJWT(token);
    return payload;
  } catch {
    return null;
  }
}
