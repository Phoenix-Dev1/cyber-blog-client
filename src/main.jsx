import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./routes/Homepage.jsx";
import PostListPage from "./routes/PostListPage.jsx";
import Write from "./routes/Write.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import SinglePostPage from "./routes/SinglePostPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext.jsx"; // Add AuthProvider
import PrivateRoute from "./routes/PrivateRoute.jsx"; // Add PrivateRoute
import AboutPage from "./routes/AboutPage.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import EditPage from "./routes/EditPage.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/:slug",
        element: <SinglePostPage />,
      },
      {
        path: "/write",
        element: (
          <PrivateRoute>
            <Write />
          </PrivateRoute>
        ), // Protect this route
      },
      {
        path: "/edit/:slug",
        element: (
          <PrivateRoute>
            element: <EditPage />,
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <LoadingProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer position="bottom-right" />
        </QueryClientProvider>
      </LoadingProvider>
    </AuthProvider>
  </StrictMode>
);
