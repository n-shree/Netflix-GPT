import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  //fetch movies data from TMDB and update the redux store
  const  nowPlayingMovies=useSelector(store=>store.movies.nowPlayingMovies)
  const dispatch = useDispatch();
  const getPlayNowMovies = () =>
    fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTIONS)
      .then((res) => res.json())
      .then((res) => {
        dispatch(addNowPlayingMovies(res.results));
      })
      .catch((err) => console.error(err));

  useEffect(() => {
   !nowPlayingMovies&& getPlayNowMovies();
  }, []);
};

export default useNowPlayingMovies;
