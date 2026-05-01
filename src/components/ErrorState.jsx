import React from "react";

const ErrorState = ({ message, onRetry, title = "System Interruption" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 bg-red-500/5 backdrop-blur-sm border border-red-500/20 rounded-3xl text-center space-y-6 animate-fade-in">
      <div className="relative">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 shadow-glow-red-sm animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-black text-white tracking-tight uppercase">
          {title}
        </h3>
        <p className="text-red-400/80 max-w-sm mx-auto leading-relaxed font-medium">
          {message || "We encountered a glitch in the matrix while retrieving data."}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-8 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 font-bold rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-2 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Re-establish Connection
        </button>
      )}
    </div>
  );
};

export default ErrorState;
