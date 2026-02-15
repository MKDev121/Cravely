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
        <div className="flex flex-col h-[92%] w-[92%] border-10 border-amber-300 self-center items-center justify-between py-8">
          {/* Title */}
          <div className="flex-1 flex items-center justify-center px-6">
            <h1 className="text-4xl text-amber-100 font-[Great_Vibes] text-center leading-snug drop-shadow-lg">
              What do you
              <br />
              want to eat?
            </h1>
          </div>

          <div className="flex flex-col items-center w-[85%]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a dish..."
              className="w-50 text-center text-xl font-[Great_Vibes] bg-transparent text-white placeholder-white/50 outline-none px-30 py-10"
            />
            <img
              src={ListArrow.src}
              alt=""
              className="w-100 h-8 object-contain mt-[-10px]"
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
