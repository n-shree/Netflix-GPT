import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  //fetch movies data from TMDB and update the redux store
  const dispatch = useDispatch();
  const getUpcomingMovies = () =>
    fetch("https://api.themoviedb.org/3/movie/upcoming", API_OPTIONS)
      .then((res) => res.json())
      .then((res) => {
        dispatch(addUpcomingMovies(res.results));
      })
      .catch((err) => console.error(err));

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
