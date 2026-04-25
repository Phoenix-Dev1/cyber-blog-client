import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatCategory } from "../utils/formatCategory";
import { format } from "timeago.js";
import DOMPurify from "dompurify";

import ProfilePage from "./ProfilePage";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const decodeHtmlEntities = (input) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = input;
  return textarea.value;
};

// Add a DOMPurify hook to restrict image and iframe sources
DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
  const trustedDomain = "https://ik.imagekit.io/guol7ryfs";

  // Restrict <img> tags to the trusted domain
  if (node.tagName === "IMG" && data.attrName === "src") {
    if (!data.attrValue.startsWith(trustedDomain)) {
      data.keepAttr = false;
    }
  }

  // Restrict <iframe> tags to the trusted domain
  if (node.tagName === "IFRAME" && data.attrName === "src") {
    if (!data.attrValue.startsWith(trustedDomain)) {
      data.keepAttr = false;
    }
  }

  // Restrict <video> and <source> tags to the trusted domain
  if ((node.tagName === "VIDEO" || node.tagName === "SOURCE") && data.attrName === "src") {
    if (!data.attrValue.startsWith(trustedDomain)) {
      data.keepAttr = false;
    }
  }
});

const SinglePostPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // If the slug starts with @, it's a profile handle
  if (slug.startsWith("@")) {
    return <ProfilePage />;
  }

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return <h4>Loading...</h4>;
  if (error) return <h4>{error.message}</h4>;
  if (!data) return <h4>"Post Not Found"</h4>;

  // Decode and sanitize the HTML content
  const decodedContent = decodeHtmlEntities(data.content);
  const sanitizedContent = DOMPurify.sanitize(decodedContent, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "a",
      "strong",
      "h1",
      "h2",
      "h3",
      "span",
      "ul",
      "ol",
      "li",
      "em",
      "u",
      "b",
      "i",
      "img",
      "iframe",
      "video",
      "source",
    ],
    ALLOWED_ATTR: [
      "class",
      "id",
      "style",
      "src",
      "alt",
      "href",
      "rel",
      "target",
      "data-list",
      "contenteditable",
      "controls",
      "type",
    ],
  });

  // Filter by category change
  const handleCategoryChange = (category) => {
    // Update the path to "posts" with the selected category
    navigate(`/posts?cat=${category}`);
  };

  const categoryClick = (category) => {
    navigate(`/posts?cat=${category}`);
  };

  return (
    <div className="flex flex-col gap-12 animate-fade-in">
      {/* Details Header */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-3/5 flex flex-col gap-6">
          <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold text-white leading-tight">
            {data.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-cyber-muted text-sm border-l-2 border-cyber-cyan/30 pl-4 py-1">
            <div className="flex items-center gap-2">
              <span className="opacity-70">By</span>
              <Link className="text-cyber-cyan hover:text-white transition-colors font-medium" to="/test">
                {data.user?.username}
              </Link>
            </div>
            <span className="w-1 h-1 rounded-full bg-cyber-muted/30"></span>
            <div className="flex items-center gap-2">
              <span className="opacity-70">in</span>
              <span
                className="text-cyber-purple hover:text-white transition-colors cursor-pointer font-medium"
                onClick={() => categoryClick(data.category)}
              >
                {formatCategory(data.category)}
              </span>
            </div>
            <span className="w-1 h-1 rounded-full bg-cyber-muted/30"></span>
            <span className="opacity-70">{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-100 text-lg md:text-xl leading-relaxed italic border-l-2 border-cyber-purple/30 pl-4">
            {data.desc}
          </p>
        </div>
        {data.img && (
          <div className="lg:w-2/5 group">
            <div className="relative rounded-3xl overflow-hidden shadow-glow-purple/20 border border-cyber-border">
              <Image
                src={data?.img}
                width="600"
                height="400"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/60 to-transparent pointer-events-none"></div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Post Section */}
        <div className="lg:w-2/3">
          <div
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-white prose-headings:font-black 
              prose-p:text-gray-100 prose-p:leading-relaxed
              prose-strong:text-cyber-cyan prose-a:text-cyber-purple prose-a:no-underline hover:prose-a:underline
              prose-li:text-gray-100 prose-ul:list-disc prose-ol:list-decimal
              prose-blockquote:border-cyber-purple prose-blockquote:bg-white/5 prose-blockquote:p-8 prose-blockquote:rounded-[2rem] prose-blockquote:text-gray-200 prose-blockquote:italic
              prose-img:rounded-3xl prose-img:border prose-img:border-white/10 prose-img:shadow-glow-cyan"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>

          <div className="mt-16 border-t border-cyber-border pt-12">
            <Comments postId={data._id} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-10">
          {/* Author Card */}
          <div className="bg-cyber-card border border-cyber-border rounded-3xl p-8 sticky top-24 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan shadow-glow-cyan"></span>
              About the Author
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="relative p-1 rounded-full bg-cyber-gradient">
                  <Image
                    src={data?.user?.img || "default-avatar.png"}
                    className="w-16 h-16 rounded-full object-cover bg-cyber-bg p-0.5"
                    width="64"
                    height="64"
                  />
                </div>
                <div className="flex flex-col">
                  <Link
                    to={`/posts?author=${data?.user?.username}`}
                    className="text-lg font-bold text-white hover:text-cyber-cyan transition-colors"
                  >
                    {data?.user?.username}
                  </Link>
                  <p className="text-sm text-cyber-muted">Cybersecurity Enthusiast</p>
                </div>
              </div>
              <p className="text-cyber-text/70 text-sm leading-relaxed">
                Dedicated to uncovering the latest trends in digital security and futuristic technologies.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://facebook.com" target="_blank" className="p-2 rounded-xl bg-cyber-surface border border-cyber-border hover:bg-cyber-purple/20 transition-colors">
                  <Image src="facebook.svg" className="w-5 h-5 opacity-80" />
                </a>
                <a href="https://instagram.com" target="_blank" className="p-2 rounded-xl bg-cyber-surface border border-cyber-border hover:bg-cyber-purple/20 transition-colors">
                  <Image src="instagram.svg" className="w-5 h-5 opacity-80" />
                </a>
              </div>
            </div>

            <div className="mt-10 border-t border-cyber-border pt-8">
              <PostMenuActions post={data} />
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-bold text-white mb-6">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {["General", "Web Design", "Development", "Databases", "SEO", "Marketing"].map((cat) => (
                  <span
                    key={cat}
                    className="px-4 py-2 rounded-full bg-cyber-surface border border-cyber-border text-xs text-cyber-text hover:bg-cyber-purple/20 hover:border-cyber-purple/50 cursor-pointer transition-all"
                    onClick={() => handleCategoryChange(cat.toLowerCase().replace(" ", "-"))}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-bold text-white mb-6">Quick Search</h2>
              <Search />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
