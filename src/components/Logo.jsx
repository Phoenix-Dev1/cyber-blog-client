const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#B026FF" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer Spherical Ring */}
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="url(#logo-gradient)"
        strokeWidth="1.5"
        filter="url(#glow)"
        className="opacity-90"
      />
      
      {/* 3D Sphere Arcs (Latitude/Longitude Effect) */}
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="6"
        stroke="url(#logo-gradient)"
        strokeWidth="1"
        className="opacity-40"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="6"
        ry="14"
        stroke="url(#logo-gradient)"
        strokeWidth="1"
        className="opacity-40"
      />
      
      {/* Dynamic Data Ring */}
      <circle
        cx="16"
        cy="16"
        r="10"
        stroke="url(#logo-gradient)"
        strokeWidth="1"
        strokeDasharray="4 4"
        className="animate-spin-slow opacity-60 origin-center"
      />
      
      {/* Core "Cyber" Node */}
      <circle
        cx="16"
        cy="16"
        r="4"
        fill="url(#logo-gradient)"
        filter="url(#glow)"
        className="animate-pulse-slow"
      />
      
      {/* Orbital Tech Bits */}
      <circle cx="16" cy="2" r="1.5" fill="#00F0FF" />
      <circle cx="16" cy="30" r="1.5" fill="#B026FF" />
      <circle cx="2" cy="16" r="1.5" fill="#00F0FF" />
      <circle cx="30" cy="16" r="1.5" fill="#B026FF" />
    </svg>
  );
};

export default Logo;
