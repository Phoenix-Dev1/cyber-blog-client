import Image from "./Image";
import { format } from "timeago.js";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const Comment = ({ comment, postId }) => {
  const { user } = useAuth(); // Access user data from AuthContext
  const queryClient = useQueryClient();

  // User's role (default to "user" if not provided)
  const role = user?.role || "user";

  // Mutation for deleting a comment
  const mutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("authToken"); // Get the token from local storage
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response.data || "Failed to delete comment");
    },
  });

  // Default image if user image is null or undefined
  const defaultImage = "default-avatar.png";
  const userImage = comment.user.img || defaultImage;

  return (
    <div className="group relative mb-8">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-cyan/5 to-cyber-purple/5 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur"></div>
      <div className="relative p-8 bg-cyber-card/30 backdrop-blur-md border border-white/5 rounded-3xl transition-all duration-300">
        <div className="flex items-start gap-5">
          {/* Avatar Identity */}
          <div className="w-12 h-12 rounded-2xl ring-1 ring-white/10 overflow-hidden shrink-0 shadow-glow-purple-sm">
            <Image
              src={userImage}
              className="w-full h-full object-cover"
              width="48"
              alt={`${comment.user.username}'s identity`}
            />
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-black text-white text-sm tracking-widest uppercase">{comment.user.username}</span>
                <span className="text-[10px] text-cyber-muted font-bold tracking-tight">
                  TRANSMISSION LOGGED: {format(comment.createdAt).toUpperCase()}
                </span>
              </div>
              
              {user && (comment.user.username === user.username || role === "admin") && (
                <button
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500/40 hover:text-red-500 transition-all border border-red-500/10 hover:border-red-500/30 px-3 py-1 rounded-lg bg-red-500/5"
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "DELETING..." : "Purge Message"}
                </button>
              )}
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
            
            <p className="text-gray-300 text-base leading-relaxed tracking-tight">
              {comment.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
