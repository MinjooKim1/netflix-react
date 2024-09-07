import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommend = (id) => {
  return api.get(`/movie/${id}/recommendations`);
};

export const useRecommendQuery = (id) => {
  return useQuery({
    queryKey: ["movie-recommend", id],
    queryFn: () => fetchRecommend(id),
    select: (result) => result.data,
    enabled: !!id,
  });
};
