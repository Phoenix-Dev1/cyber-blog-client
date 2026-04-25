import axios from "axios";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext"; // Use custom AuthContext
import { toast } from "sonner";

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
    <div className="flex flex-col gap-10 w-full max-w-4xl mb-20">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-black text-white tracking-widest uppercase">
          Digital Discussion <span className="text-cyber-cyan ml-2 text-lg">[{data?.length || 0}]</span>
        </h1>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-cyber-cyan/30 to-transparent" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="group relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 rounded-3xl blur opacity-25 group-focus-within:opacity-50 transition duration-500"></div>
        <div className="relative flex flex-col bg-cyber-card/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <textarea
            name="desc"
            placeholder="Initialize transmission... Start typing to join the discussion."
            className="w-full p-8 bg-transparent text-gray-100 text-lg leading-relaxed placeholder:text-white/20 focus:outline-none resize-none min-h-[120px]"
            required
          />
          <div className="flex items-center justify-between p-4 bg-white/5 border-t border-white/5">
            <span className="text-[10px] font-black text-cyber-cyan/50 uppercase tracking-[0.2em] ml-2">Secure Channel Active</span>
            <button 
              disabled={mutation.isPending}
              className="bg-gradient-to-r from-cyber-cyan to-cyber-purple px-10 py-3 text-cyber-bg font-black text-xs uppercase tracking-widest rounded-xl shadow-glow-cyan transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {mutation.isPending ? "Broadcasting..." : "Send Transmission"}
            </button>
          </div>
        </div>
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
