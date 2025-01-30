import React from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload.jsx";
import Image from "../components/Image.jsx";
import { useAuth } from "../context/AuthContext";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

function EditPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [img, setImg] = useState(""); // Image to upload
  const [cover, setCover] = useState(null); // Cover image for DB
  const [video, setVideo] = useState(""); // Video to upload
  const [progress, setProgress] = useState(0); // Upload progress
  const [uploading, setUploading] = useState(false); // Uploading state

  const navigate = useNavigate();

  // Get the Current Post
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return <h4>Loading...</h4>;
  if (error) return <h4>{error.message}</h4>;
  if (!data) return <h4>"Post Not Found"</h4>;

  // Data Hooks
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState(""); // ReactQuill content
  const [cat, setCat] = useState("");
  const [oldCover, setOldCover] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDesc(data.desc);
      setValue(data.content);
      setCat(data.category);
      setOldCover(import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT + data.img);
    }
  }, [data]);

  // Add image to ReactQuill content
  useEffect(() => {
    if (img) {
      setValue((prev) => prev + `<p><img src="${img.url}"/></p>`);
    }
  }, [img]);

  // Add video to ReactQuill content
  useEffect(() => {
    if (video) {
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
    }
  }, [video]);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const mutation = useMutation({
    mutationFn: async (editedPost) => {
      const token = localStorage.getItem("authToken");
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/edit/${slug}`,
        editedPost,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: (res) => {
      toast.success("Post Updated");
      navigate("/");
      window.location.reload(); // Forces a full reload
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to update post");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newData = {
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    // Only add `img` if a new cover image was uploaded
    if (cover) {
      newData.img = cover?.filePath || "";
    }

    mutation.mutate(newData);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Edit Your Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <div className="flex flex-row gap-4 items-center">
          {/* Cover image upload */}
          <span className="w-max p-2 text-sm text-gray-500">
            Current cover image
          </span>
          <Image
            src={oldCover || "/placeholderimg.jpg"}
            alt="Cover Thumbnail"
            className="rounded-md shadow-sm"
            width={48}
            height={48}
          />
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
              {cover === null ? "Change Cover Image" : "New Cover Image"}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update state on change
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
            value={cat}
            onChange={(e) => setCat(e.target.value)}
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
          value={desc}
          onChange={(e) => setDesc(e.target.value)} // Update state on change
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
        <div className="flex justify-center items-center mb-6">
          <button
            disabled={mutation.isPending || (progress > 0 && progress < 100)}
            className="bg-royalblue text-white font-medium rounded-xl p-4 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Loading" : "Edit Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPage;
