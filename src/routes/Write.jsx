import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload.jsx";
import Image from "../components/Image.jsx";
import { useAuth } from "../context/AuthContext";

const Write = () => {
  const { user } = useAuth(); // Access user from AuthContext

  const [value, setValue] = useState(""); // ReactQuill content
  const [cover, setCover] = useState(null); // Cover image for DB
  const [img, setImg] = useState(""); // Image to upload
  const [video, setVideo] = useState(""); // Video to upload
  const [progress, setProgress] = useState(0); // Upload progress
  const [uploading, setUploading] = useState(false); // Uploading state

  const navigate = useNavigate();

  // Add image to ReactQuill content
  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
  }, [img]);

  // Add video to ReactQuill content
  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = localStorage.getItem("authToken"); // Get token from localStorage
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res) => {
      toast.success("Post Published");
      navigate(`/${res.data.slug}`);
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to publish post");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      img: cover?.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <div className="flex flex-row gap-4 items-center">
          {/* Cover image upload */}
          <Upload
            type="image"
            setProgress={(progress) => {
              setProgress(progress);
              setUploading(progress > 0 && progress < 100);
            }}
            setData={setCover}
          >
            <button
              type="button"
              className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
            >
              Add a cover image
            </button>
          </Upload>
          {/* Display uploaded cover image or progress */}
          {uploading ? (
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-blue-200 rounded-full">
                <div
                  className="absolute inset-0 bg-blue-500 rounded-full"
                  style={{ height: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : cover && (cover?.filePath || cover.url) ? (
            <Image
              src={cover?.filePath || "/placeholderimg.jpg"}
              alt="Cover Thumbnail"
              className="rounded-md shadow-sm"
              width={48}
              height={48}
            />
          ) : null}
        </div>
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Story"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="cat" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            id="cat"
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A Short Description"
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              🖼️
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              📹
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md w-auto"
            value={value}
            onChange={setValue}
            readOnly={progress > 0 && progress < 100}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            disabled={mutation.isPending || (progress > 0 && progress < 100)}
            className="bg-royalblue text-white font-medium rounded-xl p-4 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Loading" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
