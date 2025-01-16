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

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return <h4>Loading...</h4>;
  if (error) return <h4>{error.message}</h4>;
  if (!data) return <h4>"Post Not Found"</h4>;

  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(data.content);

  // Filter by category change
  const handleCategoryChange = (category) => {
    // Update the path to "posts" with the selected category
    navigate(`/posts?cat=${category}`);
  };

  const categoryClick = (category) => {
    navigate(`/posts?cat=${category}`);
  };

  // console.log(data);

  return (
    <div className="flex flex-col gap-8">
      {/* Details */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className=" flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-royalblue " to="/test">
              {data.user.username}
            </Link>
            <span>on </span>
            <span
              className="text-royalblue cursor-pointer"
              onClick={() => categoryClick(data.category)}
            >
              {formatCategory(data.category)}
            </span>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-md">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} width="600" className="rounded-2xl" />
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
        </div>
        {/* Menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex  flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.img && (
                <Image
                  src={data.img}
                  className="w-12 h-12 rounded-full object-cover"
                  width="48"
                  height="48"
                />
              )}
              <Link to="" className="text-royalblue">
                {data.user.username}
              </Link>
            </div>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit, amet</p>
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <span
              className="underline cursor-pointer"
              onClick={() => handleCategoryChange("general")}
            >
              General
            </span>
            <span
              className="underline cursor-pointer"
              onClick={() => handleCategoryChange("web-design")}
            >
              Web Design
            </span>
            <span
              className="underline cursor-pointer"
              onClick={() => handleCategoryChange("development")}
            >
              Development
            </span>
            <span
              className="underline cursor-pointer"
              onClick={() => handleCategoryChange("databases")}
            >
              Databases
            </span>
            <span
              className="underline cursor-pointer"
              onClick={() => handleCategoryChange("seo")}
            >
              Search Engines
            </span>
            <span
              className="underline cursor-pointer"
              onClick={() => handleCategoryChange("marketing")}
            >
              Marketing
            </span>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
