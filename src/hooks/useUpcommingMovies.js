import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcommingMovies = () => {
  return api.get(`/movie/upcoming`);
};

export const useUpcommingMovie = () => {
  return useQuery({
    queryKey: ["movie-upcomming"],
    queryFn: fetchUpcommingMovies,
    select: (result) => result.data,
  });
};
