import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/app/api/models/User";
import { getAuthUser } from "@/lib/auth";

/** GET /api/auth/me — return the current user from the bearer token */
export async function GET(request) {
  const payload = getAuthUser(request);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findById(payload.id).select("-password");
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  return NextResponse.json({
    user: { id: user._id, username: user.username, email: user.email },
  });
}
