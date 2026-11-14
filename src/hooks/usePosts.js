import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../api/client";

const fetchPosts = async ({ pageParam = 1, searchParams }) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);
  const { data } = await api.get("/posts", {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  return data;
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
