export default function SearchResultsPage({ query, loading, results }) {
  return (
    <div className="relative flex-1 h-full bg-linear-to-b from-gray-600 to-gray-800 flex justify-center shadow-[0px_15px_25px_0px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col h-[92%] w-[92%] border-10 border-gray-500/50 shadow-[0px_0px_15px_0px_rgba(100,100,100,0.3)] self-center py-4 overflow-y-auto custom-scrollbar">
        {query.trim() === "" ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-2xl text-white/30 font-[Great_Vibes] text-center">
              Start typing to
              <br />
              find dishes...
            </p>
          </div>
        ) : loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-2xl text-amber-300/50 font-[Great_Vibes] text-center animate-pulse">
              Searching...
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-2xl text-white/40 font-[Great_Vibes] text-center">
              No dishes found
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-4">
            {results.map((dish, index) => (
              <DishResult key={dish._id} dish={dish} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
