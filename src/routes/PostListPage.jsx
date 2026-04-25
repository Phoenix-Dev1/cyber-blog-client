import { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

const PostListPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="h-20 flex items-center mb-8 border-b border-white/5">
        <h1 className="text-3xl font-bold text-white tracking-tight">Digital Archive</h1>
      </div>

      {/* Mobile Toggle */}
      <div className="mb-6 md:hidden">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-full py-3 bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 border border-cyber-cyan/50 text-cyber-cyan font-bold rounded-xl backdrop-blur-sm shadow-glow-cyan-sm active:scale-95 transition-all"
        >
          {open ? "Terminate Filters" : "Access Filters & Search"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-12 flex-1">
        {/* Main Section */}
        <div className="w-full md:w-3/4 order-2 md:order-1">
          <PostList />
        </div>

        {/* Sidebar */}
        <aside
          className={`w-full md:w-1/4 ${open ? "block" : "hidden"} md:block order-1 md:order-2`}
        >
          <div className="sticky top-24 space-y-8 bg-cyber-card/10 p-6 rounded-3xl border border-white/5 backdrop-blur-sm">
            <SideMenu />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostListPage;
