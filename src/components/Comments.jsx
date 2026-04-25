import axios from "axios";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext"; // Use custom AuthContext
import { toast } from "react-toastify";

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return res.data;
};

const Comments = ({ postId }) => {
  const { user } = useAuth(); // Access user from AuthContext
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = localStorage.getItem("authToken"); // Get token from localStorage
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment added successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to add comment");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirect to login if the user is not logged in
    if (!user) {
      toast.warn("You need to log in to submit a comment");
      navigate("/login"); // Redirect to the login page
      return;
    }

    const formData = new FormData(e.target);

    const data = {
      desc: formData.get("desc"),
    };

    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="text-xl text-white font-bold tracking-tight">
        Discussion <span className="text-cyber-cyan">[{data?.length || 0}]</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-end gap-4 w-full bg-cyber-card/30 p-4 rounded-2xl border border-cyber-border backdrop-blur-sm"
      >
        <textarea
          name="desc"
          placeholder="Join the transmission..."
          className="w-full p-4 bg-cyber-bg/50 border border-cyber-border rounded-xl text-cyber-text placeholder:text-cyber-muted focus:outline-none focus:border-cyber-cyan transition-colors resize-none min-h-[100px]"
        />
        <button className="w-full md:w-auto bg-gradient-to-r from-cyber-cyan to-cyber-purple px-8 py-3 text-cyber-bg font-bold rounded-xl shadow-glow-cyan transition-all hover:scale-105 active:scale-95 shrink-0">
          Send
        </button>
      </form>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error loading comments"
      ) : (
        <>
          {/* Show optimistic UI during mutation */}
          {mutation.isPending && (
            <Comment
              comment={{
                desc: `${mutation.variables.desc} (Sending...)`,
                createdAt: new Date(),
                user: {
                  img: user?.img || "default-avatar.png", // Use user image from AuthContext
                  username: user?.username || "Anonymous", // Use username from AuthContext
                },
              }}
            />
          )}
          {data?.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={postId} />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
