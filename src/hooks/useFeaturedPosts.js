import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFeaturedPosts = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

export const useFeaturedPosts = () => {
  return useQuery({
    queryKey: ["featuredPosts"],
    queryFn: fetchFeaturedPosts,
  });
};
