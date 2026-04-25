import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";
import { formatCategory } from "../utils/formatCategory";

const PostListItem = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 group mb-8">
      {/* Image Container */}
      {post.img && (
        <div className="xl:w-1/3 overflow-hidden rounded-3xl shadow-lg transition-all duration-500 group-hover:shadow-2xl">
          <Link to={`/${post.slug}`}>
            <Image
              src={post.img}
              width="735"
              height="400"
              className="rounded-3xl object-cover w-full aspect-video transition-transform duration-700 group-hover:scale-110"
            />
          </Link>
        </div>
      )}
      
      {/* Details Container */}
      <div className="flex flex-col gap-4 xl:w-2/3 py-2">
        <div className="flex items-center gap-3 text-xs md:text-sm font-medium">
          <Link
            to={`/posts?cat=${post.category}`}
            className="text-cyber-cyan bg-cyber-cyan/10 px-3 py-1 rounded-full hover:bg-cyber-cyan hover:text-cyber-bg transition-all text-xs font-bold"
          >
            {formatCategory(post.category)}
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400">{format(post.createdAt)}</span>
        </div>

        <Link 
          to={`/${post.slug}`} 
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-white hover:text-cyber-cyan transition-colors leading-tight"
        >
          {post.title}
        </Link>

        <div className="flex items-center gap-2 text-cyber-muted text-sm">
          <span>By</span>
          <Link
            to={`/posts?author=${post.user?.username}`}
            className="text-cyber-cyan font-bold hover:underline"
          >
            {post.user?.username || "Anonymous"}
          </Link>
        </div>

        <p className="text-cyber-text/80 line-clamp-3 leading-relaxed">
          {post.desc}
        </p>

        <Link
          to={`/${post.slug}`}
          className="inline-flex items-center gap-2 text-cyber-cyan font-bold text-sm group/link hover:gap-3 transition-all"
        >
          Read Full Article
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
