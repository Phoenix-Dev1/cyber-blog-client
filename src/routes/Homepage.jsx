import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";
import { useFeaturedPosts } from "../hooks/useFeaturedPosts";
import Skeleton from "../components/Skeleton";

const Homepage = () => {
  const { isPending, error, data } = useFeaturedPosts();
  const loadingToastId = useRef(null);

  useEffect(() => {
    let timer;

    if (isPending) {
      // Start a timer to show the toast after 3.5 seconds
      timer = setTimeout(() => {
        loadingToastId.current = toast.info("Initializing Neural Link...", {
          description: "This is a demo environment. The server may take up to 50 seconds to wake up. Hang tight while we decrypt the data!",
          duration: Infinity, // Keep it visible until we manually dismiss it
          className: "border-cyber-cyan/50 bg-cyber-bg/80 backdrop-blur-xl",
        });
      }, 3500);
    } else {
      // If we are no longer pending (either success or error)
      // 1. Clear the timer so the toast doesn't appear if data arrived quickly
      clearTimeout(timer);
      
      // 2. Dismiss the toast if it was already showing
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;
      }
      
      // 3. Show success feedback if data arrived
      if (data) {
        toast.success("Uplink Established", {
          description: "Data stream synchronized successfully.",
          duration: 3000,
        });
      }
    }

    return () => {
      clearTimeout(timer);
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
      }
    };
  }, [isPending, data]);

  useEffect(() => {
    if (error) {
      toast.error("Uplink Failure Detected", {
        description: "Our systems are having trouble reaching the mainframe. We are attempting to re-establish the connection.",
        duration: 8000,
      });
    }
  }, [error]);

  return (
    <div className="mt-8 flex flex-col gap-14 mb-24">
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
        <Link 
          to="/" 
          className="hover:text-cyber-cyan transition-colors duration-200"
        >
          Home
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-cyber-text/60">Articles & Insights</span>
        <div className="ml-auto lg:hidden">
          <Link 
            to="/write" 
            className="flex items-center gap-1 text-cyber-cyan font-bold py-1 px-3 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg animate-shimmer-cyber shadow-glow-cyan-sm"
          >
            <span className="text-lg">+</span>
            <span>Post</span>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-3/4 space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance leading-[1.1] text-cyber-text">
            Empowering Minds with{" "}
            <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
              Cyber & Tech
            </span>{" "}
            Insights.
          </h1>
          <p className="text-lg md:text-xl text-cyber-muted max-w-2xl leading-relaxed">
            Your daily destination for cutting-edge cybersecurity research, 
            technological breakthroughs, and expert analysis in the digital age.
          </p>
        </div>

        {/* PREMIUM CTA */}
        <div className="lg:w-1/4 flex justify-center lg:justify-end">
          <Link 
            to="/write" 
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-cyber-bg/40 backdrop-blur-md border border-cyber-cyan/50 rounded-xl focus:outline-none shadow-glow-cyan-sm hover:shadow-glow-cyan hover:border-cyber-cyan animate-shimmer-cyber"
          >
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyber-cyan/10 to-cyber-purple/20"></div>
            <span className="relative flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={3} 
                stroke="currentColor" 
                className="w-5 h-5 text-cyber-cyan"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create Post
            </span>
          </Link>
        </div>
      </section>

      {/* CATEGORIES NAVIGATION */}
      <div className="bg-white/5 p-5 rounded-2xl border border-white/8 backdrop-blur-sm">
        <MainCategories />
      </div>

      {/* FEATURED SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-cyber-text">Featured Stories</h2>
          <div className="h-[1px] flex-1 bg-white/8"></div>
        </div>
        <FeaturedPosts />
      </section>

      {/* RECENT POSTS SECTION */}
      <section className="space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-cyber-text tracking-tight">Recent Posts</h2>
          <Link to="/posts" className="text-cyber-cyan font-semibold hover:underline text-sm">
            View All →
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-full">
            <PostList />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
