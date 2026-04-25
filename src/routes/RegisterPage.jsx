import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Identity established. Welcome to the sphere.");
        navigate("/login");
      } else {
        const error = await response.json();
        toast.error(error.message || "Registration sequence failed.");
      }
    } catch (err) {
      toast.error("A network disruption occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
      <div className="w-full max-w-md p-8 bg-cyber-card/30 backdrop-blur-xl border border-cyber-border rounded-3xl shadow-glow-purple-sm">
        <h1 className="text-3xl font-bold mb-2 text-white tracking-tight">Register</h1>
        <p className="text-cyber-muted text-sm mb-8">Establish your identity within the sphere.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-bold uppercase tracking-widest text-cyber-muted mb-2"
            >
              System Alias
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 bg-cyber-bg/50 border border-cyber-border rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan transition-colors"
              placeholder="NeonRunner"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-widest text-cyber-muted mb-2"
            >
              Digital Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-cyber-bg/50 border border-cyber-border rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan transition-colors"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-widest text-cyber-muted mb-2"
            >
              Encryption Key
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 bg-cyber-bg/50 border border-cyber-border rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-bg font-bold rounded-xl shadow-glow-cyan transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Establishing..." : "Initialize Registry"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-cyber-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-tighter">
            <span className="bg-cyber-bg px-4 text-cyber-muted">External Registry</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleOAuth("github")}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-cyber-border rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-cyber-border rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C.79 9.84 0 12.01 0 13.51s.79 3.67 2.18 6.44l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EB4335"/>
            </svg>
            Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-cyber-muted">
          Already part of the sphere?{" "}
          <Link to="/login" className="text-cyber-cyan hover:text-cyber-purple font-bold transition-colors">
            Recall Identity
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
