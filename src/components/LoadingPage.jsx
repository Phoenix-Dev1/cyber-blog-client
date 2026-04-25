import React, { useState, useEffect } from "react";

const messages = [
  "Establishing secure uplink...",
  "Decrypting cyber insights...",
  "Warming up the quantum processors...",
  "Bribing the server hamsters...",
  "Rerouting power to the mainframe...",
  "Securing the digital perimeter...",
  "Calibrating the neural interface...",
  "Optimizing data nodes...",
  "Charging the flux capacitors...",
  "Finalizing neural handshake...",
];

const LoadingPage = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Trigger fade out
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setFade(true); // Trigger fade in
      }, 500); // Wait for fade out animation
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-cyber-bg overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/5 rounded-full blur-[120px] animate-pulse-slow delay-700" />

      {/* Premium Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md p-10 mx-6 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center gap-10">
        
        {/* Futuristic Orbital Spinner */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-[3px] border-transparent border-t-cyber-cyan border-l-cyber-cyan rounded-full animate-spin shadow-glow-cyan" style={{ animationDuration: '1.5s' }} />
          
          {/* Middle Ring */}
          <div className="absolute inset-4 border-[2px] border-transparent border-b-cyber-purple border-r-cyber-purple rounded-full animate-spin shadow-glow-purple" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
          
          {/* Inner Pulsing Node */}
          <div className="w-4 h-4 bg-white rounded-full shadow-glow-cyan animate-pulse" />
          
          {/* Scanning Laser Effect */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-pulse-slow opacity-20 transform -rotate-45" />
        </div>

        {/* Messaging Container */}
        <div className="text-center space-y-4 min-h-[80px]">
          <h1 
            className={`text-xl font-black bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent tracking-tight transition-opacity duration-500 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {messages[index]}
          </h1>
          
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black text-cyber-cyan/50 uppercase tracking-[0.3em]">
              Initializing CyberSphere
            </span>
            {/* Tiny Progress Bar */}
            <div className="w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-cyber-cyan shadow-glow-cyan animate-[loading_50s_linear_infinite]" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS for the custom progress bar animation since we don't have it in tailwind */}
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
