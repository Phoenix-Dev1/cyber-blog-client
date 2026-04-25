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
    <div className="bg-white/5 border border-white/10 p-2 rounded-full flex items-center gap-2 md:text-sm backdrop-blur-sm hover:border-cyber-cyan/30 transition-colors">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="#00F0FF"
        strokeWidth="1.5"
        opacity="0.6"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input
        type="text"
        placeholder="Search posts..."
        className="bg-transparent w-full text-cyber-text placeholder-slate-500 text-sm outline-none"
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Search;
