import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Upload from "../components/Upload.jsx";
import Image from "../components/Image.jsx";
import { useAuth } from "../context/AuthContext";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttons = [
    { label: "B", action: () => editor.chain().focus().toggleBold().run(), active: "bold" },
    { label: "I", action: () => editor.chain().focus().toggleItalic().run(), active: "italic" },
    { label: "S", action: () => editor.chain().focus().toggleStrike().run(), active: "strike" },
    { label: "Code", action: () => editor.chain().focus().toggleCode().run(), active: "code" },
    { label: "H1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: { heading: { level: 1 } } },
    { label: "H2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: { heading: { level: 2 } } },
    { label: "Quote", action: () => editor.chain().focus().toggleBlockquote().run(), active: "blockquote" },
    { label: "List", action: () => editor.chain().focus().toggleBulletList().run(), active: "bulletList" },
    { label: "Code Block", action: () => editor.chain().focus().toggleCodeBlock().run(), active: "codeBlock" },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-3 mb-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sticky top-0 z-10 shadow-2xl">
      {buttons.map((btn) => (
        <button
          key={btn.label}
          type="button"
          onClick={btn.action}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 border ${
            editor.isActive(btn.active)
              ? "bg-cyber-cyan text-cyber-bg border-cyber-cyan shadow-glow-cyan"
              : "text-gray-300 border-white/5 hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5 hover:text-white"
          }`}
        >
          {btn.label}
        </button>
      ))}
      <div className="w-[1px] h-8 bg-white/10 mx-2 self-center" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="px-4 py-2 rounded-xl text-xs font-black text-gray-400 hover:text-white hover:bg-white/5 transition-all"
      >
        Undo
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="px-4 py-2 rounded-xl text-xs font-black text-gray-400 hover:text-white hover:bg-white/5 transition-all"
      >
        Redo
      </button>
    </div>
  );
};

const Write = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cover, setCover] = useState(null);
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-3xl border border-white/10 shadow-glow-cyan my-10 max-w-full",
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-cyber-cyan underline font-bold hover:text-cyber-purple transition-all",
        },
      }),
      Placeholder.configure({
        placeholder: "Initialize transmission... Start typing to establish data.",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none text-gray-100 text-lg leading-relaxed",
      },
    },
  });

  // Add image to Tiptap content
  useEffect(() => {
    if (img && editor) {
      editor.chain().focus().setImage({ src: img.url }).run();
      setImg(null);
    }
  }, [img, editor]);

  // Handle video insertion
  useEffect(() => {
    if (video && editor) {
      editor.chain().focus().insertContent(`<p><iframe class="w-full aspect-video rounded-3xl border border-white/10 shadow-glow-purple" src="${video.url}"/></p>`).run();
      setVideo(null);
    }
  }, [video, editor]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = localStorage.getItem("authToken");
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res) => {
      toast.success("Broadcast successful.");
      navigate(`/${res.data.slug}`);
    },
    onError: (error) => {
      toast.error(error.response?.data || "Broadcast failed.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editor) return;

    const formData = new FormData(e.target);
    const data = {
      img: cover?.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: editor.getHTML(),
    };

    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-10 pb-20 max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <h1 className="text-4xl font-black text-white tracking-tight">CREATE IDENTITY</h1>
        <div className="text-[10px] font-black text-cyber-cyan uppercase tracking-[0.2em] bg-cyber-cyan/10 px-4 py-1.5 rounded-full border border-cyber-cyan/20">
          SECURE CHANNEL ACTIVE
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        {/* Cover Section */}
        <div className="flex flex-row gap-8 items-center bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-2xl">
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
              className="flex items-center gap-3 py-4 px-8 bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 border border-cyber-cyan/40 text-cyber-cyan font-black text-sm uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-glow-cyan-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Establish Cover
            </button>
          </Upload>

          {uploading ? (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-4 border-cyber-cyan/20 border-t-cyber-cyan animate-spin" />
              <span className="text-xs font-black text-cyber-cyan uppercase tracking-widest">{progress}% UPLOAD</span>
            </div>
          ) : cover && (cover?.filePath || cover.url) ? (
            <div className="relative group p-1 bg-gradient-to-br from-cyber-cyan to-cyber-purple rounded-2xl">
              <Image
                src={cover?.filePath || "/placeholderimg.jpg"}
                alt="Cover"
                className="rounded-[0.9rem] object-cover"
                width={100}
                height={100}
              />
              <button onClick={() => setCover(null)} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 shadow-xl hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
          ) : (
            <span className="text-sm text-white/20 italic font-medium tracking-tight">No visual override detected.</span>
          )}
        </div>

        {/* Title & Metadata */}
        <div className="space-y-8">
          <input
            className="w-full text-6xl md:text-8xl font-black bg-transparent border-none outline-none text-white placeholder:text-white/30 tracking-tight"
            type="text"
            placeholder="Transmission Title"
            name="title"
            required
          />
          
          <div className="flex flex-wrap items-center gap-8 p-6 bg-white/[0.03] rounded-3xl border border-white/5">
            <div className="flex items-center gap-4">
              <label htmlFor="cat" className="text-xs font-black uppercase tracking-[0.2em] text-cyber-cyan/70">ASSIGN SECTOR:</label>
              <select
                name="category"
                id="cat"
                className="bg-cyber-bg border border-white/10 rounded-xl p-3 text-sm text-white font-bold focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30 outline-none transition-all cursor-pointer"
              >
                <option value="general">General</option>
                <option value="web-design">Web Design</option>
                <option value="development">Development</option>
                <option value="databases">Databases</option>
                <option value="seo">Search Engines</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>

        <textarea
          className="w-full p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-gray-200 text-xl font-medium placeholder:text-white/30 outline-none focus:border-cyber-purple/40 transition-all resize-none h-40 leading-relaxed shadow-inner"
          name="desc"
          placeholder="Brief operational summary..."
          required
        />

        {/* Tiptap Editor Container */}
        <div className="flex flex-col min-h-[600px] bg-cyber-bg/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl relative">
          <div className="flex gap-6 p-6 border-b border-white/5 items-start">
             <div className="flex flex-col gap-4">
                <Upload type="image" setProgress={setProgress} setData={setImg}>
                  <button type="button" className="p-4 bg-white/5 hover:bg-cyber-cyan/20 hover:text-cyber-cyan text-gray-400 border border-white/10 rounded-2xl transition-all shadow-lg group" title="Insert Visual">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </button>
                </Upload>
                <Upload type="video" setProgress={setProgress} setData={setVideo}>
                   <button type="button" className="p-4 bg-white/5 hover:bg-cyber-purple/20 hover:text-cyber-purple text-gray-400 border border-white/10 rounded-2xl transition-all shadow-lg group" title="Insert Signal">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>
                  </button>
                </Upload>
             </div>
             <div className="flex-1">
                <MenuBar editor={editor} />
                <div className="mt-4 px-4">
                  <EditorContent editor={editor} />
                </div>
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-10">
          <button
            disabled={mutation.isPending || (progress > 0 && progress < 100)}
            className="group relative px-16 py-5 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-bg font-black text-lg uppercase tracking-[0.1em] rounded-3xl shadow-glow-cyan transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {mutation.isPending ? "BROADCASTING..." : "INITIALIZE PUBLICATION"}
            <div className="absolute inset-0 rounded-3xl animate-shimmer-cyber opacity-30 pointer-events-none"></div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
