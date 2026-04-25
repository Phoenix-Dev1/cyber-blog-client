import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async ({ pageParam = 1, searchParams }) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  return res.data;
};

export const usePosts = (searchParams) => {
  return useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam, searchParams }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
  });
};
