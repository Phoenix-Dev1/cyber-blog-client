import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Homepage from "./routes/Homepage.jsx";
import PostListPage from "./routes/PostListPage.jsx";
import Write from "./routes/Write.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import SinglePostPage from "./routes/SinglePostPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AboutPage from "./routes/AboutPage.jsx";
import ContactPage from "./routes/ContactPage.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import EditPage from "./routes/EditPage.jsx";
import SettingsPage from "./routes/SettingsPage.jsx";
import NotFound from "./components/NotFound.jsx";
import RouteError from "./components/RouteError.jsx";
import { captureTokenFromUrl } from "./api/client.js";

// Google/GitHub sign-in comes back with the token in the URL: store it before anything renders
captureTokenFromUrl();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data counts as fresh for a minute: no refetch on every window focus or remount
      staleTime: 60 * 1000,
      // Don't retry what can't succeed (404, 401, 400…); retry network and server errors once
      retry: (failureCount, error) => {
        const status = error?.response?.status;
        if (status >= 400 && status < 500) return false;
        return failureCount < 1;
      },
    },
  },
});

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <RouteError />,
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
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        // Both posts ("/my-post") and profiles ("/@username")
        path: "/:slug",
        element: <SinglePostPage />,
      },
      {
        path: "/write",
        element: (
          <PrivateRoute>
            <Write />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit/:slug",
        element: (
          <PrivateRoute>
            <EditPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <SettingsPage />
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
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoadingProvider>
          <RouterProvider router={router} />
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              className:
                "!bg-white/5 !backdrop-blur-md !border !border-white/10 !rounded-2xl !text-gray-100 !p-4 !shadow-2xl",
              success: {
                className: "!border-cyber-cyan/50",
              },
              error: {
                className: "!border-red-500/50",
              },
            }}
          />
        </LoadingProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
