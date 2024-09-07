import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchReviews = (id) => {
  return api.get(`/movie/${id}/reviews`);
};

export const useReview = (id) => {
  return useQuery({
    queryKey: ["movie-reviews", id],
    queryFn: () => fetchReviews(id),
    select: (result) => result.data,
  });
};
