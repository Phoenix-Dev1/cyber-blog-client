import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";
import AddPostButton from "../components/AddPostButton";

const Homepage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/*BREADCRUMB*/}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span>•</span>
        <span className="text-royalblue font-medium">Blogs and Articles</span>
      </div>
      {/*INRODUCTION*/}
      <div className="flex items-center justify-between">
        {/*Titles*/}
        <div className="">
          <h1 className="text-gray-800 tex-2xl md:text-5xl lg:text-6xl font-bold">
            Empowering Minds with Insights on Cyber and Tech.
          </h1>
          <p className="mt-8 text-md md:text-xl">
            Your Daily Dose of Cybersecurity Insights and Technological
            Breakthroughs
          </p>
        </div>
        {/*Animated Button*/}
        <Link to="write" className="hidden md:block relative">
          <AddPostButton />
        </Link>
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
