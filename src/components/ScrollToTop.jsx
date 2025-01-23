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
        className="fixed bottom-5 right-5 hidden lg:block shadow-md w-12 h-12 bg-blue-800 z-10 border-none rounded-full text-white cursor-pointer text-2xl justify-center items-center transition-opacity duration-300 ease-in-out transform hover:bg-royalblue hover:scale-110 "
        onClick={handleScrollToTop}
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTop;
