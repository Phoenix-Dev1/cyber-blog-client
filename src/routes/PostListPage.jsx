import { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

const PostListPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="h-16 flex items-center justify-left mb-4">
        <h1 className="text-2xl">Cyber Sphere</h1>
      </div>

      {/* Mobile Button */}
      <div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden bg-royalblue text-sm text-white px-4 py-2 mb-4 rounded-2xl"
        >
          {open ? "Close" : "Filter or Search"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Section */}
        <div className="w-full md:w-4/5 overflow-auto">
          <PostList />
        </div>

        {/* Sidebar */}
        <div
          className={`w-full md:w-1/5 ${open ? "block" : "hidden"} md:block `}
        >
          <div className="sticky top-16 p-4">
            {/* The sticky class ensures the sidebar stays in view */}
            <SideMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
