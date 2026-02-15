import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/app/api/models/User";
import { signToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    await dbConnect();

    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existing) {
      return NextResponse.json(
        { error: "Username or email already taken." },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    const token = signToken({ id: user._id, username: user.username });

    return NextResponse.json(
      { token, user: { id: user._id, username: user.username, email: user.email } },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
