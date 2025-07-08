import { NextRequest, NextResponse } from "next/server";

import { signJWT } from "@/lib/jwt";
import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  await connectToDB();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "No account found" }, { status: 404 });
  }

  const resetToken = await signJWT({ id: user._id }, "15m"); // expires in 15 minutes

  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`;

  // TODO: Send email here (or just log it for now)
  console.log(`Password reset link: ${resetUrl}`);

  return NextResponse.json({ message: "Reset link sent to your email" });
}
