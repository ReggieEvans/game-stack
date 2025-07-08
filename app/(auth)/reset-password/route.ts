import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import { verifyJWT } from "@/lib/jwt";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  try {
    const decoded = await verifyJWT(token);
    await connectToDB();

    const hashed = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashed });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 },
    );
  }
}
