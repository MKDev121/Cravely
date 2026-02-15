"use client";

import { useState, useEffect, useRef } from "react";
import ListArrow from "../Assets/ListArrow.png";

export default function SearchView({ onGoBack }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    // Clear previous timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    // Debounce 300ms so we don't spam the API on every keystroke
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/dishes/search?q=${encodeURIComponent(trimmed)}`
        );
        const data = await res.json();
        setResults(data.dishes ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  return (
    <div className="flex h-[95vh] w-[80vw] gap-0">
      {/* ── Left page: Search ── */}
      <div className="relative flex-1 h-full bg-linear-to-b from-gray-600 to-gray-800 flex justify-center shadow-[0px_15px_25px_0px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col h-[92%] w-[92%] border-10 border-amber-300 shadow-[0px_0px_25px_0px_rgba(255,210,64,0.5)] self-center items-center justify-between py-8">
          {/* Title */}
          <div className="flex-1 flex items-center justify-center px-6">
            <h1 className="text-4xl text-amber-100 font-[Great_Vibes] text-center leading-snug drop-shadow-lg">
              What do you
              <br />
              want to eat?
            </h1>
          </div>

          {/* Search bar styled like the list arrow */}
          <div className="relative w-[85%] h-[15%] flex items-center">
            {/* Arrow background */}
            <img
              src={ListArrow.src}
              alt=""
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
            {/* Input overlaid on top */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a dish..."
              className="relative z-10 w-full text-center text-xl font-[Great_Vibes] bg-transparent text-white placeholder-white/50 outline-none px-16 py-2"
            />
          </div>

          {/* Go Back button */}
          <button
            onClick={onGoBack}
            className="group flex h-[18%] w-[50%] items-center justify-center mt-4 cursor-pointer"
          >
            <div className="flex w-full h-[60%] transition duration-300 translate-x-4 group-hover:rotate-45 group-hover:translate-x-8 bg-[url(Assets/SpoonIcon.png)] bg-center bg-contain bg-no-repeat"></div>
            <div className="flex w-full h-full bg-[url(Assets/PlateButtonIcon.png)] bg-center bg-contain bg-no-repeat justify-center">
              <span className="self-center text-lg text-center font-[Great_Vibes]">
                Go
                <br />
                Back
              </span>
            </div>
            <div className="flex w-full h-[60%] transition duration-300 -translate-x-4 group-hover:-rotate-45 group-hover:-translate-x-8 bg-[url(Assets/ForkIcon.png)] bg-center bg-contain bg-no-repeat"></div>
          </button>
        </div>
      </div>

      {/* ── Right page: Results ── */}
      <div className="relative flex-1 h-full bg-linear-to-b from-gray-600 to-gray-800 flex justify-center shadow-[0px_15px_25px_0px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col h-[92%] w-[92%] border-10 border-gray-500/50 shadow-[0px_0px_15px_0px_rgba(100,100,100,0.3)] self-center py-4 overflow-y-auto custom-scrollbar">
          {query.trim() === "" ? (
            /* Empty state - no search yet */
            <div className="flex-1 flex items-center justify-center">
              <p className="text-2xl text-white/30 font-[Great_Vibes] text-center">
                Start typing to
                <br />
                find dishes...
              </p>
            </div>
          ) : loading ? (
            /* Loading */
            <div className="flex-1 flex items-center justify-center">
              <p className="text-2xl text-amber-300/50 font-[Great_Vibes] text-center animate-pulse">
                Searching...
              </p>
            </div>
          ) : results.length === 0 ? (
            /* No results */
            <div className="flex-1 flex items-center justify-center">
              <p className="text-2xl text-white/40 font-[Great_Vibes] text-center">
                No dishes found
              </p>
            </div>
          ) : (
            /* Dish results */
            <div className="flex flex-col gap-2 px-4">
              {results.map((dish, index) => (
                <DishResult key={dish._id} dish={dish} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DishResult({ dish, index }) {
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
