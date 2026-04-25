import { Link } from "react-router-dom";
import Search from "./Search";

const CATEGORIES = [
  { to: "/posts?cat=web-design", label: "Web Design" },
  { to: "/posts?cat=development", label: "Development" },
  { to: "/posts?cat=databases", label: "Databases" },
  { to: "/posts?cat=search-engines", label: "Search Engines" },
  { to: "/posts?cat=marketing", label: "Marketing" },
];

const MainCategories = () => {
  return (
    <div className="hidden md:flex bg-cyber-card/30 backdrop-blur-md border border-cyber-border rounded-2xl xl:rounded-full p-2 items-center justify-between gap-4">
      {/* Links */}
      <div className="flex-1 flex items-center justify-around flex-wrap px-2">
        <Link
          to="/posts"
          className="bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-bg font-bold rounded-full px-6 py-2 text-sm shadow-glow-cyan transition-all hover:scale-105 active:scale-95"
        >
          All Posts
        </Link>
        {CATEGORIES.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="text-cyber-muted font-bold text-xs uppercase tracking-widest hover:text-cyber-cyan hover:bg-white/5 rounded-full px-4 py-2 transition-all"
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="h-8 w-[1px] bg-cyber-border shrink-0" />
      {/* Search */}
      <div className="pr-2 shrink-0">
        <Search />
      </div>
    </div>
  );
};

export default MainCategories;
