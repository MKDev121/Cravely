import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Dish from "../../models/Dish";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();

    if (!q) {
      return NextResponse.json({ dishes: [] });
    }

    // Case-insensitive partial match on dish name
    const dishes = await Dish.find({
      name: { $regex: q, $options: "i" },
    })
      .limit(20)
      .lean();

    return NextResponse.json({ dishes });
  } catch (err) {
    console.error("Dish search error:", err);
    return NextResponse.json(
      { error: "Failed to search dishes" },
      { status: 500 }
    );
  }
}
