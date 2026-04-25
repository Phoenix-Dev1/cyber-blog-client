import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

const MainLayout = () => {
  const location = useLocation();

  const hideFooterRoutes = ["/write"];
  const shouldHideFooter =
    hideFooterRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/edit/");

  return (
    <div className="min-h-screen flex flex-col bg-cyber-bg text-cyber-text relative">
      {/* Ambient hero glow */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, #00F0FF 0%, #B026FF 50%, transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col flex-1 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
          <Analytics />
        </main>
        {!shouldHideFooter && <Footer />}
        <ScrollToTop />
      </div>
    </div>
  );
};

export default MainLayout;
