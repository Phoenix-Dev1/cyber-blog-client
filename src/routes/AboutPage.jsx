import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-cyber-cyan rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyber-purple rounded-full blur-[140px] animate-pulse-slow"></div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-20 relative pt-12">
        <div className="inline-block px-4 py-1 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan text-sm font-medium mb-6 animate-fade-in">
          Identity & Vision
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-cyber-gradient tracking-tight">
          About Us
        </h1>
        <p className="mt-4 text-xl text-cyber-text max-w-2xl mx-auto leading-relaxed">
          Empowering Minds with Insights on Cyber and Tech.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Mission Section */}
        <div className="p-8 rounded-2xl border border-cyber-border bg-cyber-surface backdrop-blur-xl hover:border-cyber-cyan/50 transition-all duration-500 group shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-cyber-cyan/10 flex items-center justify-center mb-6 border border-cyber-cyan/20 group-hover:shadow-glow-cyan transition-all">
            <svg className="w-6 h-6 text-cyber-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-cyber-muted leading-relaxed">
            At <strong className="text-cyber-cyan">Cyber Sphere</strong>, we aim to bridge the gap between the
            complexities of cybersecurity and technology and everyday
            understanding. Whether you're a professional in the field or a curious
            beginner, we provide the insights you need to stay ahead.
          </p>
        </div>

        {/* Team Section */}
        <div className="p-8 rounded-2xl border border-cyber-border bg-cyber-surface backdrop-blur-xl hover:border-cyber-purple/50 transition-all duration-500 group shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-cyber-purple/10 flex items-center justify-center mb-6 border border-cyber-purple/20 group-hover:shadow-glow-purple transition-all">
            <svg className="w-6 h-6 text-cyber-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-cyber-muted leading-relaxed">
            Our team consists of passionate tech enthusiasts, skilled developers,
            and cybersecurity experts. Together, we strive to bring you
            high-quality content and a platform to inspire innovation.
          </p>
        </div>
      </div>

      {/* What We Offer & Values */}
      <div className="space-y-8 mb-20">
        <div className="p-10 rounded-3xl border border-cyber-border bg-cyber-surface backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-gradient opacity-10 blur-3xl"></div>
          
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Experience CyberSphere</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-cyber-cyan font-semibold text-lg mb-4 flex items-center">
                <span className="w-2 h-2 rounded-full bg-cyber-cyan mr-3"></span>
                What We Offer
              </h3>
              <ul className="space-y-4">
                {[
                  "Engaging articles on cybersecurity & development",
                  "Tutorials for all skill levels",
                  "Latest tech trends and tool reviews",
                  "A community-driven storytelling platform"
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-cyber-muted group">
                    <span className="text-cyber-cyan mr-3 opacity-50 group-hover:opacity-100 transition-opacity">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-cyber-purple font-semibold text-lg mb-4 flex items-center">
                <span className="w-2 h-2 rounded-full bg-cyber-purple mr-3"></span>
                Our Values
              </h3>
              <ul className="space-y-4">
                {[
                  { title: "Knowledge Sharing", desc: "Empowering through accessible content" },
                  { title: "Innovation", desc: "Discussing cutting-edge advancements" },
                  { title: "Community", desc: "Building a space for tech enthusiasts" },
                  { title: "Integrity", desc: "Ensuring accurate and impactful content" }
                ].map((val, i) => (
                  <li key={i} className="text-cyber-muted">
                    <span className="text-white font-medium">{val.title}:</span> {val.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center p-12 rounded-3xl bg-cyber-gradient shadow-glow-purple relative overflow-hidden group">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Me on This Journey
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Become part of our growing community and stay ahead in the digital
            world. Explore, learn, and share with <strong className="text-white">Cyber Sphere</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-white text-cyber-purple font-bold rounded-full shadow-2xl hover:scale-105 transition duration-300 active:scale-95 flex items-center justify-center">
              Contact Us
            </Link>
            <Link to="/" className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition duration-300 flex items-center justify-center">
              Explore Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
