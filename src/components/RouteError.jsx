import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NotFound from "./NotFound";

// The router's error screen: a render error on any page shows this instead of React Router's raw
// "Unexpected Application Error" page.
const RouteError = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="min-h-screen bg-cyber-bg text-cyber-text px-4">
        <NotFound />
      </div>
    );
  }

  console.error(error);
  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text flex flex-col items-center justify-center text-center gap-6 px-4">
      <h1 className="text-3xl font-black text-white uppercase tracking-tight">Something went wrong</h1>
      <p className="text-cyber-muted max-w-md">
        This page ran into an unexpected error. Reloading usually fixes it.
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-bg font-black text-xs uppercase tracking-widest"
        >
          Reload
        </button>
        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest"
        >
          Home
        </a>
      </div>
    </div>
  );
};

export default RouteError;
