import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";
import { formatCategory } from "../utils/formatCategory";
import { useFeaturedPosts } from "../hooks/useFeaturedPosts";
import Skeleton from "./Skeleton";
import ErrorState from "./ErrorState";

const FeaturedPosts = () => {
  const { isPending, error, data, refetch } = useFeaturedPosts();

  if (isPending) {
    return (
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <Skeleton className="w-full aspect-video rounded-3xl bg-white/5" />
          <Skeleton className="w-1/4 h-6 bg-white/5" />
          <Skeleton className="w-3/4 h-10 bg-white/5" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 h-32">
              <Skeleton className="w-1/3 h-full rounded-2xl bg-white/5" />
              <div className="w-2/3 space-y-2">
                <Skeleton className="w-1/4 h-4 bg-white/5" />
                <Skeleton className="w-full h-6 bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        message={error.message === "Network Error" ? "Our uplink is down. Please check your connection or wait for system recovery." : error.message} 
        onRetry={() => refetch()} 
      />
    );
  }

  const posts = data.posts;
  if (!posts || posts.length === 0) return null;

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* Main Featured Post */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 group">
        {posts[0].img && (
          <Link to={`/${posts[0].slug}`} className="overflow-hidden rounded-3xl shadow-xl transition-all duration-500 group-hover:shadow-2xl">
            <Image
              src={posts[0].img}
              width="895"
              height="480"
              className="rounded-3xl object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
        )}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="bg-cyber-cyan/10 text-cyber-cyan px-3 py-1 rounded-full font-bold text-xs">01</span>
            <Link
              to={`/posts?cat=${posts[0].category}`}
              className="font-bold text-cyber-cyan hover:underline"
            >
              {formatCategory(posts[0].category)}
            </Link>
            <span className="text-cyber-muted font-medium">{format(posts[0].createdAt)}</span>
          </div>
          <Link
            to={`/${posts[0].slug}`}
            className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight block hover:text-cyber-cyan transition-colors text-white"
          >
            {posts[0].title}
          </Link>
          <p className="text-cyber-text/80 line-clamp-2 text-lg leading-relaxed">
            {posts[0].desc}
          </p>
        </div>
      </div>

      {/* Side Posts Grid */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        {posts.slice(1, 4).map((post, index) => (
          <div key={post._id} className="flex gap-6 group/item">
            {post.img && (
              <Link to={`/${post.slug}`} className="w-1/3 aspect-[4/3] shrink-0 overflow-hidden rounded-2xl shadow-md transition-all duration-300 group-hover/item:shadow-lg">
                <Image
                  src={post.img}
                  width="298"
                  className="rounded-2xl object-cover w-full h-full transition-transform duration-500 group-hover/item:scale-110"
                />
              </Link>
            )}
            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center gap-3 text-xs md:text-sm">
                <span className="font-bold text-cyber-muted">0{index + 2}</span>
                <Link
                  to={`/posts?cat=${post.category}`}
                  className="text-cyber-cyan font-bold hover:underline"
                >
                  {formatCategory(post.category)}
                </Link>
                <span className="text-cyber-muted/60">{format(post.createdAt)}</span>
              </div>
              <Link
                to={`/${post.slug}`}
                className="text-lg md:text-xl font-bold leading-snug line-clamp-2 hover:text-cyber-cyan transition-colors text-white"
              >
                {post.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
