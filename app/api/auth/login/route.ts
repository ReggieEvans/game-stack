import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { createCookie } from "@/lib/authCookies";
import { signJWT } from "@/lib/jwt";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectToDB();

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = await signJWT({
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  });
  const res = NextResponse.json({ success: true });
  res.headers.set("Set-Cookie", createCookie(token));

  return res;
}
