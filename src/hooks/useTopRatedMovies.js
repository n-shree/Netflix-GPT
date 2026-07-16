import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  //fetch movies data from TMDB and update the redux store
   const  topRatedMovies=useSelector(store=>store.movies.topRated)
 
  const dispatch = useDispatch();
  const getTopRatedMovies = () =>
    fetch("https://api.themoviedb.org/3/movie/top_rated?page=1", API_OPTIONS)
      .then((res) => res.json())
      .then((res) => {
        dispatch(addTopRatedMovies(res.results));
      })
      .catch((err) => console.error(err));

  useEffect(() => {
    !topRatedMovies&&getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
