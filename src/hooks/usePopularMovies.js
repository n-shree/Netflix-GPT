import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  //fetch movies data from TMDB and update the redux store
  const  popularMovies=useSelector(store=>store.movies.popularMovies)
  const dispatch = useDispatch();
  const getPopularMovies = () =>
    fetch("https://api.themoviedb.org/3/movie/popular?page=1", API_OPTIONS)
      .then((res) => res.json())
      .then((res) => {
        dispatch(addPopularMovies(res.results));
      })
      .catch((err) => console.error(err));

  useEffect(() => {
    !popularMovies&&getPopularMovies();
  }, []);
};

export default usePopularMovies;
