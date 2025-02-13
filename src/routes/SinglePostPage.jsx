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
});

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
    <div className="flex flex-col">
      {/* Details */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className=" flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-royalblue " to="/test">
              {data.user?.username}
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
          <div className="hidden lg:block w-2/5 mb-4">
            <Image
              src={data?.img}
              width="600"
              height="400"
              className="rounded-2xl"
            />
          </div>
        )}
      </div>
      {/* Main Content */}
      <div className="flex">
        {/* Main Section */}
        <div className="w-full m-2 text-sm md:text-base lg:text-lg flex flex-col gap-6 text-justify">
          <div
            className="prose max-w-full"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>
        </div>
        {/* Sidebar */}
        <div className=" w-1/3 px-4 h-max sticky top-8 ml-8 mt-8 hidden lg:block md:block flex-col items-center text-center">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex  flex-col gap-4">
            <div className="flex items-center justify-center gap-4">
              <Image
                src={data?.user?.img || "default-avatar.png"}
                className="w-12 h-12 rounded-full object-cover"
                width="48"
                height="48"
              />
              <Link
                to={`/posts?author=${data?.user?.username}`}
                className="text-royalblue"
              >
                {data?.user?.username}
              </Link>
            </div>
            <p className="text-sm text-gray-500">Cybersecurity enthusiast</p>
            <div className="flex gap-2 items-center text-center justify-center">
              <a href="https://www.facebook.com" target="_blank">
                <Image src="facebook.svg" />
              </a>
              <a href="https://www.instagram.com" target="_blank">
                <Image src="instagram.svg" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <PostMenuActions post={data} />
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 justify-center text-sm">
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
      <div className="m-2">
        <Comments postId={data._id} />
      </div>
    </div>
  );
};

export default SinglePostPage;
