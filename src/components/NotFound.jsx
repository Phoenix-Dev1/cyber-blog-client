import { Link } from "react-router-dom";

// Shown for unknown addresses, missing posts and missing profiles
const NotFound = ({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
}) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-6 py-16 animate-fade-in">
    <div className="text-7xl md:text-8xl font-black bg-clip-text text-transparent bg-cyber-gradient tracking-tighter">
      404
    </div>
    <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">{title}</h1>
    <p className="text-cyber-muted max-w-md">{message}</p>
    <div className="flex gap-4">
      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-bg font-black text-xs uppercase tracking-widest shadow-glow-cyan transition-all hover:scale-105"
      >
        Back to Home
      </Link>
      <Link
        to="/posts"
        className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest transition-all hover:bg-white/10"
      >
        Browse Posts
      </Link>
    </div>
  </div>
);

export default NotFound;
