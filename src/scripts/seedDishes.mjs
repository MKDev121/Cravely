/**
 * One-time seed script – run with:
 *   node src/scripts/seedDishes.mjs
 *
 * After seeding, manage dishes directly in MongoDB Compass.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, default: "🍽️" },
  category: { type: String, trim: true, default: "Other" },
}, { timestamps: true });

DishSchema.index({ name: "text" });

const Dish = mongoose.model("Dish", DishSchema);

const dishes = [
  { name: "Cheese Burger", image: "🍔", category: "Burgers" },
  { name: "Chicken Burger", image: "🍔", category: "Burgers" },
  { name: "Veggie Burger", image: "🍔", category: "Burgers" },
  { name: "Margherita Pizza", image: "🍕", category: "Pizza" },
  { name: "Pepperoni Pizza", image: "🍕", category: "Pizza" },
  { name: "BBQ Chicken Pizza", image: "🍕", category: "Pizza" },
  { name: "Caesar Salad", image: "🥗", category: "Salads" },
  { name: "Greek Salad", image: "🥗", category: "Salads" },
  { name: "Grilled Chicken", image: "🍗", category: "Chicken" },
  { name: "Fish and Chips", image: "🐟", category: "Seafood" },
  { name: "Pasta Carbonara", image: "🍝", category: "Pasta" },
  { name: "Spaghetti Bolognese", image: "🍝", category: "Pasta" },
  { name: "Chicken Wings", image: "🍗", category: "Chicken" },
  { name: "French Fries", image: "🍟", category: "Sides" },
  { name: "Tacos", image: "🌮", category: "Mexican" },
  { name: "Burrito", image: "🌯", category: "Mexican" },
  { name: "Sushi Roll", image: "🍣", category: "Japanese" },
  { name: "Fried Rice", image: "🍚", category: "Asian" },
  { name: "Pad Thai", image: "🍜", category: "Asian" },
  { name: "Ice Cream Sundae", image: "🍨", category: "Desserts" },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const existing = await Dish.countDocuments();
  if (existing > 0) {
    console.log(`Collection already has ${existing} dishes – skipping seed.`);
    console.log("Delete them manually in Compass if you want to re-seed.");
  } else {
    await Dish.insertMany(dishes);
    console.log(`Seeded ${dishes.length} dishes successfully!`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
