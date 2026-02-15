import { useState } from "react";
import ListArrow from "../Assets/ListArrow.png";

export default function DishResult({ dish, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex items-center w-full py-1 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dish content */}
      <div className="flex-1 flex flex-col">
        {/* Dish name */}
        <span
          className={`text-xl font-[Great_Vibes] ml-4 transition-colors duration-200 ${
            hovered ? "text-amber-300" : "text-white"
          }`}
        >
          {dish.name}
        </span>
        {/* Arrow bar */}
        <div className="relative w-full h-8">
          <img
            src={ListArrow.src}
            alt=""
            className={`w-full h-full object-contain transition-all duration-200 ${
              hovered ? "brightness-150 hue-rotate-15" : ""
            }`}
            style={
              hovered
                ? { filter: "brightness(1.3) sepia(1) saturate(3) hue-rotate(10deg)" }
                : {}
            }
          />
        </div>
      </div>

      {/* Dish image */}
      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center ml-2">
        <span className="text-3xl">{dish.image}</span>
      </div>

      {/* "Let's Try!" hover text */}
      {hovered && (
        <span className="absolute right-16 top-0 text-sm text-amber-300/70 font-[Great_Vibes] italic">
          Let&apos;s Try!
        </span>
      )}
    </div>
  );
}
