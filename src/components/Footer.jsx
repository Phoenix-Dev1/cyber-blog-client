import React from "react";

const Footer = () => {
  return (
    <footer className="hidden lg:block text-center py-6 mt-8 border-t border-white/5 text-cyber-muted text-sm">
      Made with{" "}
      <span className="text-cyber-purple">♥</span>
      {" "}by{" "}
      <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent font-semibold">
        Bar Kaziro
      </span>
      {" "}| © 2025 CyberSphere
    </footer>
  );
};

export default Footer;
