import { useQuery } from "@tanstack/react-query";
import api from "../api/client";

const fetchFeaturedPosts = async () => {
  const { data } = await api.get("/posts", {
    params: { featured: true, limit: 4, sort: "newest" },
  });
  return data;
};

export const useFeaturedPosts = () => {
  return useQuery({
    queryKey: ["featuredPosts"],
    queryFn: fetchFeaturedPosts,
  });
};
