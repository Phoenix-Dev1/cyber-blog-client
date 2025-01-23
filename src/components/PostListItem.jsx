import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";
import { formatCategory } from "../utils/formatCategory";

const PostListItem = ({ post }) => {
  return (
    <div className=" flex flex-col xl:flex-row gap-8 mb-12">
      {/* Image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image
            src={post.img}
            width="735"
            height="400"
            className="rounded-2xl object-cover"
          />
        </div>
      )}
      {/* Details */}
      <div className="flex flex-col gap-4 w-11/12">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link
            to={`/posts?author=${post.user?.username}`}
            className="text-royalblue"
          >
            {post.user?.username}
          </Link>
          <span>on</span>
          <Link to={`/posts?cat=${post.category}`} className="text-royalblue">
            {formatCategory(post.category)}
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>
        {/* Description */}
        <p className="">{post.desc}</p>
        <Link
          to={`/${post.slug}`}
          className="underline text-royalblue text-sm w-11/12"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
