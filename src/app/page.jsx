"use client";

import { useState } from "react";
import MenuPage from "./Components/MenuPage";
import PlateButton from "./Components/PlateButton";
import SearchView from "./Components/SearchView";

export default function Home() {
  const [view, setView] = useState("welcome"); // "welcome" | "flipping" | "search" | "flipping-back"

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
      {(view === "flipping" || view === "flipping-back") && (
        <div className="menu-flip-overlay">
          <div className={view === "flipping" ? "menu-flip-page" : "menu-flip-page-back"} />
        </div>
      )}

      {view === "welcome" || view === "flipping" ? (
        <MenuPage>
          <div className="flex flex-col items-center justify-between h-full w-full py-10">
            {/* Welcome text */}
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-5xl text-amber-300 font-[Great_Vibes] drop-shadow-lg">
                Welcome to Cravely
              </h1>
            </div>

            {/* Plate button pinned to bottom */}
            <PlateButton onClick={handleLetsEat} />
          </div>
        </MenuPage>
      ) : (
        <SearchView onGoBack={handleGoBack} />
      )}
    </main>
  );
}
