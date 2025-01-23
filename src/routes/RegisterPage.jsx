import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      } else {
        const error = await response.json();
        toast.error(error.message || "Registration failed.");
      }
    } catch (err) {
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-20px)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-royalblue text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Or register with:
        </p>
        <div className="flex flex-col items-center gap-4 justify-center mt-2">
          <button
            type="button"
            onClick={() => handleOAuth("github")}
            class="py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="mr-2"
              viewBox="0 0 1792 1792"
            >
              <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
            </svg>
            GitHub
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="py-2 px-4 max-w-md flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="mr-2 w-5 h-5"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.14 0 5.93 1.19 8.11 3.11l6.07-6.07C34.91 3.28 29.81 1 24 1 14.78 1 7.11 6.75 3.8 14.16l7.07 5.5C12.57 13.03 17.89 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.9 24.58c0-1.23-.1-2.44-.28-3.61H24v7.1h13.08c-.58 3.07-2.31 5.69-4.88 7.46l7.07 5.5c4.1-3.77 6.63-9.34 6.63-16.45z"
              />
              <path
                fill="#4A90E2"
                d="M9.2 28.84c-.68-1.98-1.08-4.11-1.08-6.34 0-2.23.4-4.36 1.08-6.34L2.12 10.5C.77 13.18 0 16.03 0 19s.77 5.82 2.12 8.5l7.08-5.5z"
              />
              <path
                fill="#FBBC05"
                d="M24 46c5.81 0 10.71-1.92 14.28-5.22l-7.07-5.5C28.66 37.8 26.39 38.5 24 38.5c-6.11 0-11.43-3.53-14.13-8.66l-7.07 5.5C7.11 41.25 14.78 46 24 46z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            Google
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-royalblue hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
