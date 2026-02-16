"use client";

import { useState, useRef, useEffect } from "react";
import MenuPage from "./Components/MenuPage";
import PlateButton from "./Components/PlateButton";
import SearchView from "./Components/SearchView";
import SearchResultsPage from "./Components/SearchResultsPage";
export default function Home() {
  const [view, setView] = useState("welcome"); // "welcome" | "flipping" | "search" | "flipping-back"

  // State for right page (search results)
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  // Fetch logic for right page
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/dishes/search?q=${encodeURIComponent(trimmed)}`);
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

  const handleLetsEat = () => {
    setView("flipping");
    setTimeout(() => setView("search"), 600);
  };

  const handleGoBack = () => {
    setView("flipping-back");
    setTimeout(() => setView("welcome"), 600);
  };

  return (
    <main className="flex-1 flex-col content-around justify-items-center border-2 h-screen bg-[url(Assets/WebpageBackground.png)] bg-size-[100vw_100vh]">
      {/* Page flip overlay */}
      {view === "welcome" || view === "flipping" ? (
        <MenuPage>
          {(view === "flipping" || view === "flipping-back") && (
            <>
              <div className="menu-flip-overlay" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <div className={view === "flipping" ? "menu-flip-page" : "menu-flip-page-back"} style={{ width: '100%', height: '100%' }} />
              </div>
              <div style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                display: 'flex',
              }}>
                <SearchResultsPage query={query} loading={loading} results={results} />
              </div>
            </>
          )}
          <div className="flex flex-col items-center justify-between h-full w-full py-10">
            <div className="flex-1 flex items-center justify-center">
              <h1 className="items-center text-center text-7xl text-amber-300 font-[Great_Vibes] drop-shadow-lg">
                Cravely
              </h1>
            </div>
              <PlateButton onClick={handleLetsEat} />
          </div>
        </MenuPage>
      ) : (
        <SearchView onGoBack={handleGoBack} />
      )}
    </main>
  );
}
