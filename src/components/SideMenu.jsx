import Search from "./Search";
import { useSearchParams } from "react-router-dom";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter by options
  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };

  // Filter by category change
  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-cyber-muted">Search</h2>
        <Search />
      </div>

      <div>
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-cyber-muted">Sort By</h2>
        <div className="flex flex-col gap-4 text-sm">
          {["newest", "popular", "trending", "oldest"].map((sortOption) => (
            <label key={sortOption} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="sort"
                onChange={handleFilterChange}
                value={sortOption}
                checked={searchParams.get("sort") === sortOption || (sortOption === "newest" && !searchParams.get("sort"))}
                className="appearance-none w-5 h-5 border border-cyber-cyan/30 cursor-pointer rounded-full bg-cyber-bg/50 checked:bg-cyber-cyan checked:border-transparent shadow-glow-cyan-sm transition-all group-hover:border-cyber-cyan/60"
              />
              <span className="text-cyber-muted group-hover:text-white transition-colors capitalize">
                {sortOption.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-cyber-muted">Categories</h2>
        <div className="flex flex-col gap-3 text-sm">
          {["all", "general", "web-design", "development", "databases", "seo", "marketing"].map((cat) => (
            <span
              key={cat}
              className={`cursor-pointer transition-all duration-200 hover:translate-x-1 ${
                (searchParams.get("cat") === cat || (cat === "all" && !searchParams.get("cat")))
                  ? "text-cyber-cyan font-bold"
                  : "text-cyber-muted hover:text-cyber-cyan"
              }`}
              onClick={() => handleCategoryChange(cat === "all" ? "" : cat)}
            >
              {cat === "all" ? "All Sectors" : cat.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
