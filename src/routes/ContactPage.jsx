import React, { useState } from "react";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo only: Show success toast and clear form
    toast.success("Message sent successfully (Demo Mode)");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 opacity-10 blur-3xl">
        <div className="w-96 h-96 bg-cyber-purple rounded-full"></div>
      </div>
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-cyber-gradient mb-4">
          Get in Touch
        </h1>
        <p className="text-cyber-muted text-lg max-w-2xl mx-auto">
          Have a question or want to collaborate? Reach out to the CyberSphere team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="md:col-span-1 space-y-8">
          <div className="p-6 rounded-2xl border border-cyber-border bg-cyber-surface backdrop-blur-md">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-cyber-cyan/10 flex items-center justify-center mr-3 border border-cyber-cyan/20">
                <svg className="w-4 h-4 text-cyber-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Email Us
            </h3>
            <p className="text-cyber-muted text-sm break-all">hello@cybersphere.tech</p>
            <p className="text-cyber-muted text-sm mt-1">support@cybersphere.tech</p>
          </div>

          <div className="p-6 rounded-2xl border border-cyber-border bg-cyber-surface backdrop-blur-md">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-cyber-purple/10 flex items-center justify-center mr-3 border border-cyber-purple/20">
                <svg className="w-4 h-4 text-cyber-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              Community
            </h3>
            <p className="text-cyber-muted text-sm">Join 5,000+ tech enthusiasts in our Discord community.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl border border-cyber-border bg-cyber-surface backdrop-blur-xl shadow-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyber-muted ml-1">Full Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-cyber-border text-white focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-cyber-muted ml-1">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-cyber-border text-white focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-cyber-muted ml-1">Subject</label>
              <input
                required
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-cyber-border text-white focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 outline-none transition-all"
                placeholder="How can we help?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-cyber-muted ml-1">Message</label>
              <textarea
                required
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-cyber-border text-white focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 outline-none transition-all resize-none"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-cyber-gradient text-white font-bold shadow-glow-purple hover:shadow-glow-cyan hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
