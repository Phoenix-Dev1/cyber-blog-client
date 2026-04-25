import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext"; // Use custom AuthContext

const PostMenuActions = ({ post }) => {
  const { user } = useAuth(); // Access user from AuthContext
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const shouldFetchSavedPosts = !!user;

  // Fetch saved posts
  const {
    isLoading,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/saved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    enabled: shouldFetchSavedPosts, // Only fetch if user exists
  });

  const isAdmin = user?.role === "admin";

  // Check if the post is saved
  const isSaved = savedPosts?.some((p) => p === post._id) || false;

  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: async (password) => {
      const token = localStorage.getItem("authToken");
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          password
        }
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to delete post");
    },
  });

  // Save post mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("authToken");
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to save post");
    },
  });

  // Feature post mutation
  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("authToken");

      if (!user) {
        return <p>Please log in to access actions.</p>;
      }
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to feature post");
    },
  });

  // Handlers
  const handleDelete = () => {
    toast.custom((t) => (
      <div className="bg-cyber-bg/95 backdrop-blur-xl border border-cyber-cyan/50 p-5 rounded-2xl shadow-glow-cyan w-[350px]">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete Post
        </h2>
        <p className="text-sm text-cyber-muted mb-4 leading-relaxed">
          Demo Environment Protection: Please enter the deletion password to proceed.
        </p>
        <form onSubmit={(e) => {
          e.preventDefault();
          const pwd = e.target.password.value;
          toast.dismiss(t);
          if (pwd) deleteMutation.mutate(pwd);
        }}>
          <input 
            name="password" 
            type="password" 
            placeholder="Enter password..."
            className="w-full bg-black/60 border border-cyber-cyan/30 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all mb-4" 
            autoFocus 
          />
          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => toast.dismiss(t)} 
              className="px-4 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all font-medium text-sm shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-red-500/50"
            >
              Confirm Delete
            </button>
          </div>
        </form>
      </div>
    ), { duration: Infinity });
  };

  const handleSave = () => {
    if (!user) {
      navigate("/login");
    } else {
      saveMutation.mutate();
    }
  };

  const handleFeature = () => {
    featureMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-4 text-sm font-medium">
      <h1 className="text-white font-bold mb-2">Actions</h1>
      {isLoading ? (
        <span className="text-cyber-muted animate-pulse">Loading...</span>
      ) : error ? (
        <span className="text-red-400">Failed to fetch status</span>
      ) : (
        <div
          className="flex items-center gap-3 py-2 text-cyber-text hover:text-cyber-cyan cursor-pointer transition-colors group"
          onClick={handleSave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
            className="transition-transform group-hover:scale-110"
          >
            <path
              d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
              stroke="white"
              strokeWidth="2"
              fill={
                saveMutation.isPending
                  ? isSaved
                    ? "none"
                    : "white"
                  : isSaved
                  ? "white"
                  : "none"
              }
            />
          </svg>
          <span>{isSaved ? "Saved" : "Save this post"}</span>
          {saveMutation.isPending && (
            <span className="text-xs text-cyber-muted animate-pulse">...</span>
          )}
        </div>
      )}
      {isAdmin && (
        <div
          className="flex items-center gap-3 py-2 text-cyber-text hover:text-cyber-cyan cursor-pointer transition-colors group"
          onClick={handleFeature}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
            className="transition-transform group-hover:scale-110"
          >
            <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
              stroke="white"
              strokeWidth="2"
              fill={
                featureMutation.isPending
                  ? post.isFeatured
                    ? "none"
                    : "white"
                  : post.isFeatured
                  ? "white"
                  : "none"
              }
            />
          </svg>
          <span>{post.isFeatured ? "Featured" : "Feature this post"}</span>
          {featureMutation.isPending && (
            <span className="text-xs text-cyber-muted animate-pulse">...</span>
          )}
        </div>
      )}
      {user && (post.user.username === user.username || isAdmin) && (
        <div
          className="flex items-center gap-3 py-2 text-red-400 hover:text-red-300 cursor-pointer transition-colors group"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="currentColor"
            width="20px"
            height="20px"
            className="transition-transform group-hover:scale-110"
          >
            <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z" />
          </svg>
          <span>Delete Post</span>
          {deleteMutation.isPending && (
            <span className="text-xs text-cyber-muted animate-pulse">...</span>
          )}
        </div>
      )}
      {user && (post.user.username === user.username || isAdmin) && (
        <div
          className="flex items-center gap-3 py-2 text-cyber-text hover:text-cyber-cyan cursor-pointer transition-colors group"
          onClick={() => navigate(`/edit/${post.slug}`)}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 -0.5 21 21"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            className="transition-transform group-hover:scale-110"
          >
            <g id="SVGRepo_iconCarrier">
              <path
                d="M3,260 L24,260 L24,258.010742 L3,258.010742 L3,260 Z M13.3341,254.032226 L9.3,254.032226 L9.3,249.950269 L19.63095,240 L24,244.115775 L13.3341,254.032226 Z"
                transform="translate(-59.000000, -400.000000) translate(56.000000, 160.000000)"
                fill="white"
              ></path>
            </g>
          </svg>
          <span>Edit Post</span>
        </div>
      )}
    </div>
  );
};

export default PostMenuActions;
