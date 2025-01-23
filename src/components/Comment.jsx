import Image from "./Image";
import { format } from "timeago.js";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

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
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <Image
          src={userImage}
          className="w-10 h-10 rounded-full object-cover"
          width="40"
          alt={`${comment.user.username}'s avatar`}
        />
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>
        {user &&
          (comment.user.username === user.username || role === "admin") && (
            <span
              className="text-xs text-red-300 hover:text-red-500 cursor-pointer"
              onClick={() => mutation.mutate()}
            >
              Delete
              {mutation.isPending && <span>(in progress)</span>}
            </span>
          )}
      </div>
      <div className="mt-4">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
