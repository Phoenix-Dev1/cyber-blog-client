import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      if (location.pathname === "/posts") {
        setSearchParams({ ...Object.fromEntries(searchParams), search: query });
      } else {
        navigate(`/posts?search=${query}`);
      }
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 p-3 rounded-full flex items-center gap-3 md:text-sm backdrop-blur-sm focus-within:border-cyber-cyan/50 focus-within:shadow-glow-cyan-sm transition-all group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="#00F0FF"
        strokeWidth="2"
        className="opacity-70 group-focus-within:opacity-100 transition-opacity"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input
        type="text"
        placeholder="Search the archive..."
        className="bg-transparent w-full text-white placeholder:text-white/30 text-sm outline-none font-medium"
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Search;
