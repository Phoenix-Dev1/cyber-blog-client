import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingPage from "../components/LoadingPage";

// Pages that need a login. While the stored token is being checked, show the loading screen (a page reload
// used to bounce logged-in users to /login here). Logged-out visitors go to /login and come back after.
const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingPage />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
};

export default PrivateRoute;
