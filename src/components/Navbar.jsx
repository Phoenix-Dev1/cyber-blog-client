import { useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth(); // Access user and logout from AuthContext
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="CyberSphere Logo" width={32} height={32} />
        <span>CyberSphere.</span>
      </Link>

      {/* MOBILE MENU */}
      <div className="md:hidden z-10">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-3xl z-10"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "☰"}
        </div>
        {/* MOBILE LINK LIST */}
        <div
          className={`w-full h-4/6 flex flex-col items-center justify-center gap-8 font-medium absolute top-16 bg-[#e6e6ff] transition-all ease-in-out ${
            open ? "-right-0" : "-right-[100%] z-10"
          }`}
        >
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/posts?sort=trending" onClick={() => setOpen(false)}>
            Trending
          </Link>
          <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>
            Most Popular
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          {!user ? (
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="py-2 px-4 rounded-3xl bg-royalblue text-white">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={() => {
                logout(true);
                setOpen(false);
              }}
              className="py-2 px-4 rounded-3xl bg-red-500 text-white"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl-gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/posts?&sort=trending">Trending</Link>
        <Link to="/posts?sort=popular">Most Popular</Link>
        <Link to="/about">About</Link>
        {!user ? (
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-royalblue text-white">
              Login
            </button>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Image
              src={user.img || "default-avatar.png"} // Use user's profile image
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <button
              onClick={logout}
              className="py-2 px-4 rounded-3xl bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
