// Decision Q3: the old form only pretended to send. Visitors now write from their own mail app.
const CONTACT_EMAIL = "contact@barkaziro.co.il";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hello from CyberSphere")}`;

const ContactPage = () => {
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
            <a href={MAILTO} className="text-cyber-cyan text-sm break-all hover:text-cyber-purple transition-colors">
              {CONTACT_EMAIL}
            </a>
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

        {/* Write to us */}
        <div className="md:col-span-2">
          <div className="p-8 md:p-10 rounded-3xl border border-cyber-border bg-cyber-surface backdrop-blur-xl shadow-2xl flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white">Send us a message</h2>
            <p className="text-cyber-muted leading-relaxed">
              Questions, ideas, or something you’d like us to write about? Email us at{" "}
              <a href={MAILTO} className="text-cyber-cyan hover:text-cyber-purple transition-colors break-all">
                {CONTACT_EMAIL}
              </a>{" "}
              and we’ll get back to you.
            </p>
            <a
              href={MAILTO}
              className="self-start px-10 py-4 rounded-xl bg-cyber-gradient text-white font-bold shadow-glow-purple hover:shadow-glow-cyan hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
