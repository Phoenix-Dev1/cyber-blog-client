import PostListItem from "./PostListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import Skeleton from "./Skeleton";

const PostList = () => {
  const [searchParams] = useSearchParams();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,
  } = usePosts(searchParams);

  if (status === "pending") {
    return (
      <div className="flex flex-col gap-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col xl:flex-row gap-8">
            <div className="xl:w-1/3 aspect-video rounded-2xl bg-white/5 animate-pulse" />
            <div className="xl:w-2/3 space-y-4">
              <div className="w-1/4 h-6 bg-white/5 rounded-md animate-pulse" />
              <div className="w-3/4 h-10 bg-white/5 rounded-md animate-pulse" />
              <div className="w-full h-20 bg-white/5 rounded-md animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return (
    <div className="p-8 text-center bg-red-500/10 rounded-3xl border border-red-500/20">
      <p className="text-red-400 font-semibold">Something went wrong while fetching posts.</p>
    </div>
  );

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  if (status === "success" && allPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 bg-cyber-card/20 backdrop-blur-sm border border-cyber-border rounded-3xl text-center space-y-6">
        <div className="w-20 h-20 bg-cyber-cyan/10 rounded-full flex items-center justify-center border border-cyber-cyan/20 shadow-glow-cyan-sm animate-pulse-slow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-cyber-cyan">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white tracking-tight uppercase">No Data Found in this Sector</h3>
          <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
            Our scanners couldn't locate any posts matching your criteria. The digital frontier is quiet for now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      scrollThreshold={0.8}
      loader={
        <div className="flex justify-center p-12">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 border-4 border-cyber-cyan/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-cyber-cyan border-t-transparent rounded-full animate-spin shadow-glow-cyan-sm"></div>
          </div>
        </div>
      }
      endMessage={
        allPosts.length > 0 ? (
          <div className="py-16 text-center">
            <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <p className="text-gray-400 text-xs font-black tracking-widest uppercase">End of digital frontier</p>
            </div>
          </div>
        ) : null
      }
    >
      <div className="flex flex-col gap-12">
        {allPosts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default PostList;
