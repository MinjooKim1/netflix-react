import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = () => {
  return api.get(`/movie/top_rated`);
};

export const useTopRatedQuery = () => {
  return useQuery({
    queryKey: ["movie-rated"],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};
