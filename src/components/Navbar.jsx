import { useState } from "react";
import Image from "./Image";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleProfileModal = () => {
    setProfileModalOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-3 text-2xl font-bold group">
        <Logo className="w-9 h-9" />
        <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
          CyberSphere.
        </span>
      </Link>

      {/* MOBILE MENU TOGGLE */}
      <div className="md:hidden z-20">
        <div
          className="cursor-pointer text-2xl text-cyber-text hover:text-cyber-cyan transition-colors"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </div>

        {/* MOBILE MENU */}
        <div
          className={`w-full flex flex-col items-center justify-center gap-8 font-medium fixed top-16 left-0 h-screen bg-cyber-bg/95 backdrop-blur-xl border-t border-cyber-border transition-transform duration-300 ease-in-out z-10 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {[
            { to: "/", label: "Home" },
            { to: "/write", label: "Write" },
            { to: "/posts?sort=trending", label: "Trending" },
            { to: "/posts?sort=popular", label: "Most Popular" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setOpen(false)}
              className="text-cyber-muted hover:text-cyber-cyan transition-colors text-lg"
            >
              {label}
            </Link>
          ))}
          {!user ? (
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="py-2 px-8 rounded-full border border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white transition-all shadow-glow-purple-sm">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={() => { logout(true); setOpen(false); }}
              className="py-2 px-8 rounded-full border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 font-medium">
        {[
          { to: "/", label: "Home" },
          { to: "/posts?sort=trending", label: "Trending" },
          { to: "/posts?sort=popular", label: "Most Popular" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
        ].map(({ to, label }) => (
          <Link
            key={label}
            to={to}
            className="text-cyber-muted hover:text-cyber-cyan transition-colors text-sm tracking-wide"
          >
            {label}
          </Link>
        ))}

        {!user ? (
          <Link to="/login">
            <button className="py-2 px-5 rounded-full border border-cyber-purple text-cyber-purple text-sm font-bold hover:bg-cyber-purple hover:text-white transition-all duration-200 shadow-glow-purple-sm hover:shadow-glow-purple">
              Login
            </button>
          </Link>
        ) : (
          <div className="relative">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={toggleProfileModal}
            >
              <div className="w-8 h-8 rounded-full ring-2 ring-cyber-purple/50 ring-offset-2 ring-offset-cyber-bg overflow-hidden">
                <Image
                  src={user.img || "default-avatar.png"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-bold text-cyber-text group-hover:text-cyber-cyan transition-colors">
                {user.username}
              </span>
            </div>

            {/* Profile Dropdown */}
            {profileModalOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-cyber-card/90 backdrop-blur-md border border-cyber-border rounded-xl shadow-glow-purple-sm z-50 overflow-hidden">
                <Link
                  to={`/@${user.username}`}
                  className="block px-4 py-3 text-sm text-cyber-muted hover:text-cyber-cyan hover:bg-white/5 transition-colors"
                  onClick={() => setProfileModalOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-3 text-sm text-cyber-muted hover:text-cyber-cyan hover:bg-white/5 transition-colors"
                  onClick={() => setProfileModalOpen(false)}
                >
                  Settings
                </Link>
                <div className="h-[1px] bg-cyber-border" />
                <button
                  onClick={() => { logout(); setProfileModalOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
