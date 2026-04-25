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
    <div className="p-6 bg-cyber-card/40 backdrop-blur-md border border-cyber-border rounded-2xl mb-6 transition-all hover:bg-cyber-card/60 group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full ring-2 ring-cyber-purple/30 overflow-hidden shrink-0">
          <Image
            src={userImage}
            className="w-full h-full object-cover"
            width="40"
            alt={`${comment.user.username}'s avatar`}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-wide">{comment.user.username}</span>
            <span className="text-xs text-cyber-muted">
              {format(comment.createdAt)}
            </span>
          </div>
        </div>
        {user &&
          (comment.user.username === user.username || role === "admin") && (
            <button
              className="ml-auto text-[10px] uppercase tracking-widest text-red-400/50 hover:text-red-400 font-bold transition-colors"
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Erasing..." : "Delete"}
            </button>
          )}
      </div>
      <div className="mt-4 pl-14">
        <p className="text-cyber-text leading-relaxed">{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
