import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";

const useTrailerVideo=(movieId) =>{
    //fetch Movie trailer and update the redux store
  const dispatch = useDispatch();
   const getMovieVideo = () =>
    fetch(
      "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
      API_OPTIONS,
    )
      .then((res) => res.json())
      .then((res) => {
        const trailer = res.results.filter((video) => video.type === "Trailer");
         dispatch(addTrailerVideo(trailer[0]));
      })
      .catch((err) => console.error(err));
  useEffect(() => {
    getMovieVideo();
  }, []);
}

export default useTrailerVideo;
