import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import { useQuery } from "@tanstack/react-query";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";
import AddPostButton from "../components/AddPostButton/AddPostButton";
import LoadingPage from "../components/LoadingPage";
import axios from "axios";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const Homepage = () => {
  const { isPending, isLoading, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending || isLoading) return <LoadingPage></LoadingPage>;
  if (error) return <h4>{error.message}</h4>;

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/*BREADCRUMB*/}
      <div className="flex gap-4">
        <div>
          <Link to="/">Home</Link>
          <span className="mr-4 ml-4">•</span>
          <span className="font-medium">Blogs and Articles</span>
        </div>
        <div className="lg:hidden">
          <span className="mr-4">•</span>
          <Link to="/write" className="text-royalblue font-medium">
            New Post
          </Link>
        </div>
      </div>
      {/*INRODUCTION*/}
      <div className="flex flex-1">
        <div className="flex items-center justify-between">
          {/*Titles*/}
          <div className="w-4/5 ">
            <h1 className="text-gray-800 tex-2xl md:text-5xl lg:text-6xl font-bold">
              Empowering Minds with Insights on Cyber and Tech.
            </h1>
            <p className="mt-8 text-md md:text-xl">
              Your Daily Dose of Cybersecurity Insights and Technological
              Breakthroughs
            </p>
          </div>
          {/*Animated Button*/}
          <div className="w-1/5 hidden rounded-md shadow-md lg:block relative items-center justify-center">
            <Link to="write" className="hidden md:block relative">
              <AddPostButton />
              <span className="absolute cursor-pointer text-white text-center hover:text-gray-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1">
                Create A Post!
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/*CATEGORIES*/}
      <MainCategories />
      {/*FEATURED POSTS*/}
      <FeaturedPosts />
      {/*POST LIST*/}
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default Homepage;
