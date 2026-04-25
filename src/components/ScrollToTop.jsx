import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  // Show the button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    showButton && (
      <button
        className="fixed bottom-8 right-8 hidden lg:flex items-center justify-center w-12 h-12 bg-cyber-bg/80 backdrop-blur-md border border-cyber-purple/50 rounded-full text-cyber-cyan cursor-pointer transition-all duration-300 z-50 hover:scale-110 hover:border-cyber-cyan shadow-glow-purple-sm hover:shadow-glow-cyan animate-pulse-slow"
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
    )
  );
};

export default ScrollToTop;
