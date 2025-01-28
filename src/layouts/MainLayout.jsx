import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";

const MainLayout = () => {
  const location = useLocation();

  // Routes where the footer should not appear
  const hideFooterRoutes = ["/write"];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-28">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
        <Analytics />
      </main>
      {!shouldHideFooter && <Footer className="z-1" />}
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
