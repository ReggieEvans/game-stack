import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { createCookie } from "@/lib/authCookies";
import { signJWT } from "@/lib/jwt";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: Request) {
  const { email, password, username } = await req.json();
  await connectToDB();

  const existing = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });

  if (existing)
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 400 },
    );

  if (existingUsername)
    return NextResponse.json(
      { error: "Username already taken" },
      { status: 400 },
    );

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, username, password: hashed });

  const token = await signJWT({
    id: newUser._id,
    email: newUser.email,
    username: newUser.username,
    role: newUser.role,
  });

  const res = NextResponse.json({ success: true });
  res.headers.set("Set-Cookie", createCookie(token));

  return res;
}
