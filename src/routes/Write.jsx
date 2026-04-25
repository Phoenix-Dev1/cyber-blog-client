import { useEditor, EditorContent, ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import { Node, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Upload from "../components/Upload.jsx";
import Image from "../components/Image.jsx";
import { useAuth } from "../context/AuthContext";

const VideoNodeView = ({ node, updateAttributes }) => {
  const alignment = node.attrs.align || 'center';
  
  let marginClass = 'mx-auto';
  if (alignment === 'left') marginClass = 'mr-auto ml-0';
  if (alignment === 'right') marginClass = 'ml-auto mr-0';

  return (
    <NodeViewWrapper 
      className={`group relative block max-w-full my-4 ${marginClass}`} 
      style={{ width: node.attrs.width }}
    >
      <video
        controls
        src={node.attrs.src}
        className="w-full aspect-video rounded-3xl border border-white/10 shadow-glow-purple"
        style={{ pointerEvents: 'auto' }}
      />
      
      {/* Alignment Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-cyber-bg/90 backdrop-blur-xl border border-cyber-cyan/30 rounded-xl p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-glow-cyan-sm">
        <button 
          type="button"
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateAttributes({ align: 'left' }); }} 
          className={`p-1.5 rounded-lg transition-colors ${alignment === 'left' ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
          title="Align Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
        </button>
        <button 
          type="button"
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateAttributes({ align: 'center' }); }} 
          className={`p-1.5 rounded-lg transition-colors ${alignment === 'center' ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
          title="Align Center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm4 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm-4 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
        </button>
        <button 
          type="button"
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateAttributes({ align: 'right' }); }} 
          className={`p-1.5 rounded-lg transition-colors ${alignment === 'right' ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
          title="Align Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm8 5a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zm-8 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
        </button>
      </div>

      <div
        className="absolute -bottom-3 -right-3 w-8 h-8 bg-cyber-bg border-2 border-cyber-cyan/50 rounded-full cursor-nwse-resize hover:bg-cyber-cyan hover:scale-110 transition-all z-50 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.4)] opacity-0 group-hover:opacity-100"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation(); // Prevent video from playing/pausing
          const startX = e.pageX;
          const startWidth = e.target.closest('.group').offsetWidth;
          
          const onMouseMove = (moveEvent) => {
            moveEvent.preventDefault();
            const newWidth = Math.max(200, startWidth + (moveEvent.pageX - startX));
            updateAttributes({ width: `${newWidth}px` });
          };
          
          const onMouseUp = (upEvent) => {
            upEvent.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };
          
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyber-cyan group-hover:text-cyber-bg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 8a1 1 0 011-1h1V6a1 1 0 012 0v2h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 01-1-1z" />
          <path fillRule="evenodd" d="M15 12a1 1 0 01-1 1h-1v1a1 1 0 11-2 0v-2h-1a1 1 0 110-2h1V9a1 1 0 112 0v1h1a1 1 0 011 1z" clipRule="evenodd" />
        </svg>
      </div>
    </NodeViewWrapper>
  );
};

// Custom Video Extension with ReactNodeViewRenderer
const Video = Node.create({
  name: 'video',
  group: 'block',
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      width: { default: '100%' },
      align: { default: 'center' },
      class: { default: 'aspect-video rounded-3xl border border-white/10 shadow-glow-purple my-4 max-w-full' },
    };
  },
  parseHTML() {
    return [{ tag: 'video' }];
  },
  renderHTML({ HTMLAttributes }) {
    const align = HTMLAttributes.align || 'center';
    let marginStyle = '1rem auto';
    if (align === 'left') marginStyle = '1rem auto 1rem 0';
    if (align === 'right') marginStyle = '1rem 0 1rem auto';
    
    return ['video', mergeAttributes(HTMLAttributes, { controls: true, style: `width: ${HTMLAttributes.width}; display: block; margin: ${marginStyle};` }), ['source', { src: HTMLAttributes.src }]];
  },
  addNodeView() {
    return ReactNodeViewRenderer(VideoNodeView);
  },
});

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
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Video,
      ImageResize.configure({
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
      editor.chain().focus().insertContent({
        type: 'video',
        attrs: { src: video.url }
      }).run();
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
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
            <div className="flex-1 space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-cyber-cyan uppercase tracking-[0.2em] ml-1 animate-pulse">Establishing Signal...</span>
               </div>
               <div className="relative p-1 bg-gradient-to-br from-cyber-cyan/10 to-cyber-purple/10 rounded-3xl border border-white/5 w-full aspect-video flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-cyber-bg/50 backdrop-blur-md z-10 flex flex-col items-center justify-center gap-6">
                    <div className="w-16 h-16 rounded-full border-4 border-cyber-cyan/20 border-t-cyber-cyan animate-spin shadow-glow-cyan" />
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-black text-cyber-cyan uppercase tracking-widest">{progress}% SYNCING</span>
                      <span className="text-[10px] text-cyber-cyan/60 uppercase tracking-[0.2em]">Transmitting to Archive</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white/5 animate-pulse" />
               </div>
            </div>
          ) : cover && (cover?.filePath || cover.url) ? (
            <div className="flex-1 space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-cyber-purple uppercase tracking-[0.2em] ml-1">Broadcast Preview</span>
                  <button onClick={() => setCover(null)} className="text-[10px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-2 group transition-all">
                    Terminating Signal
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:rotate-90 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
               </div>
               <div className="relative group p-1 bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 rounded-3xl border border-white/5">
                <Image
                  src={cover?.filePath || "/placeholderimg.jpg"}
                  alt="Cover"
                  className="w-full aspect-video rounded-[1.4rem] object-cover shadow-2xl"
                  width={1200}
                  height={675}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/40 to-transparent rounded-[1.4rem] pointer-events-none" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-white/20 italic font-medium tracking-tight bg-white/[0.01] px-6 py-4 rounded-2xl border border-white/5">
              <div className="w-2 h-2 rounded-full bg-white/10 animate-pulse" />
              No visual override detected.
            </div>
          )}
        </div>

        {/* Title & Metadata */}
        <div className="space-y-8">
          <textarea
            className={`w-full font-black bg-transparent border-none outline-none text-white placeholder:text-white/30 tracking-tight resize-none overflow-hidden min-h-[1em] transition-all duration-300 ${
              title ? "text-4xl md:text-6xl" : "text-6xl md:text-8xl"
            }`}
            placeholder="Transmission Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            rows="1"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
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
        <div className="flex flex-col min-h-[600px] bg-cyber-bg/40 border border-white/5 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative">
          {/* Sticky Toolbar Section */}
          <div className="sticky top-0 z-20 flex items-center gap-4 p-4 border-b border-white/5 bg-cyber-bg/80 backdrop-blur-md rounded-t-[2.5rem]">
             {/* Media Actions */}
             <div className="flex items-center gap-2 pr-4 border-r border-white/10">
                <Upload type="image" setProgress={setProgress} setData={setImg}>
                  <button type="button" className="p-2.5 bg-white/5 hover:bg-cyber-cyan/20 hover:text-cyber-cyan text-gray-400 border border-white/10 rounded-xl transition-all shadow-lg group" title="Insert Visual">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </button>
                </Upload>
                <Upload type="video" setProgress={setProgress} setData={setVideo}>
                   <button type="button" className="p-2.5 bg-white/5 hover:bg-cyber-purple/20 hover:text-cyber-purple text-gray-400 border border-white/10 rounded-xl transition-all shadow-lg group" title="Insert Signal">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>
                  </button>
                </Upload>
             </div>

             {/* Formatting Actions */}
             <div className="flex-1 overflow-x-auto no-scrollbar">
                <MenuBar editor={editor} />
             </div>
          </div>

          {/* Editor Content Area */}
          <div className="p-10 flex-1">
            <EditorContent editor={editor} />
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
