import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { formatCategory } from "../utils/formatCategory";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending) return <h4>Loading...</h4>;
  if (error) return <h4>{error.message}</h4>;

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First */}
      <div className="w-full lg:w1/2 flex flex-col gap-4 ">
        {/* Image */}
        {posts[0].img && (
          <Image
            src={posts[0].img}
            width="895"
            height="480"
            className="rounded-3xl object-cover"
          />
        )}
        {/* Details */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link
            to={`/posts?cat=${posts[0].category}`}
            className="text-royalblue lg:text-lg"
          >
            {formatCategory(posts[0].category)}
          </Link>
          <span className="text-gray-400 text-sm">Written by</span>
          <Link
            to={`/posts?author=${posts[0].user?.username}`}
            className="text-royalblue"
          >
            {posts[0].user?.username}
          </Link>
          <span className="text-gray-500">{format(posts[0].createdAt)}</span>
        </div>
        {/* Title */}
        <Link
          to={`/${posts[0]?.slug}`}
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          {posts[0].title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>{format(posts[0].createdAt)}</span>
        </div>
      </div>
      {/* Other Posts */}
      <div className="w-full lg:w1/2 flex flex-col gap-4 ">
        {/* Second */}
        {posts[1] && (
          <div className="lg:h-1/3 flex justify-between mt-2 mb-2 gap-4">
            {posts[1].img && (
              <div className="w-1/3 aspect-video">
                <Image
                  src={posts[1].img}
                  width="298"
                  className="rounded-3xl object-cover w-full h-full"
                />
              </div>
            )}
            {/* Details & title */}
            <div className="w-2/3">
              {/* Details */}
              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">02.</h1>
                <Link
                  to={`/posts?cat=${posts[1].category}`}
                  className="text-royalblue"
                >
                  {formatCategory(posts[1].category)}
                </Link>
                <span className="text-gray-500 text-sm">
                  {format(posts[1].createdAt)}
                </span>
              </div>
              {/* Title */}
              <Link
                to={`/${posts[1]?.slug}`}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
              >
                {posts[1].title}
              </Link>
            </div>
          </div>
        )}
        {/* Third */}
        {posts[2] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            {posts[2].img && (
              <div className="w-1/3 aspect-video">
                <Image
                  src={posts[2].img}
                  width="298"
                  className="rounded-3xl object-cover w-full h-full"
                />
              </div>
            )}
            {/* Details & title */}
            <div className="w-2/3">
              {/* Details */}
              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">03.</h1>
                <Link
                  to={`/posts?cat=${posts[2].category}`}
                  className="text-royalblue"
                >
                  {formatCategory(posts[2].category)}
                </Link>
                <span className="text-gray-500 text-sm">
                  {format(posts[2].createdAt)}
                </span>
              </div>
              {/* Title */}
              <Link
                to={`/${posts[2]?.slug}`}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
              >
                {posts[2].title}
              </Link>
            </div>
          </div>
        )}
        {/* Fourth */}
        {posts[3] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            {posts[3].img && (
              <div className="w-1/3 aspect-video">
                <Image
                  src={posts[3].img}
                  width="298"
                  className="rounded-3xl object-cover w-full h-full"
                />
              </div>
            )}
            {/* Details & title */}
            <div className="w-2/3">
              {/* Details */}
              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">04.</h1>
                <Link
                  to={`/posts?cat=${posts[3].category}`}
                  className="text-royalblue"
                >
                  {formatCategory(posts[3].category)}
                </Link>
                <span className="text-gray-500 text-sm">
                  {format(posts[3].createdAt)}
                </span>
              </div>
              {/* Title */}
              <Link
                to={`/${posts[3]?.slug}`}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
              >
                {posts[3].title}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;
