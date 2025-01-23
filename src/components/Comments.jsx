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
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          name="desc"
          placeholder="Write a comment..."
          className="w-full p-4 rounded-xl"
        />
        <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">
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
