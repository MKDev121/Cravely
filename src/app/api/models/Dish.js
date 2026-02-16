import mongoose from "mongoose";

const DishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "🍽️",
    },
    category: {
      type: String,
      trim: true,
      default: "Other",
    },
  },
  { timestamps: true }
);

// Text index for efficient searching
DishSchema.index({ name: "text" });

export default mongoose.models.Dish || mongoose.model("Dish", DishSchema);
