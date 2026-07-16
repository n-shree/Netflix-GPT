import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstant";
import client from "../utils/openAI";
import ai from "../utils/geminiai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovies } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  /* const handleGptSearchClick = async () => {
    //make an api call to openAi and get movie result
      const gptQuery="Act like a  movie recommendation system and suggest some movies for the query"+searchText?.current.value+ "give array of five movies name only";

    const gptResult = await client.chat.completions.create({
      model: "gpt-5.5",
      messages: [
        { role: "user", content: gptQuery},
      ],
    });
    console.log(gptResult.choices)
  }; */
   const searchMoviesTMDB = async (movie) => { 
    const data=await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    )
    const json=await data.json();
   
    return json.results
  };
  const handleGptSearchClick = async () => {
    //make an api call to openAi and get movie result
    const gptQuery =
      "Act like a  movie recommendation system and suggest some movies for the query" + searchText?.current.value +
      "give names of five movies comma separated like the example ahead. example result:alpha,jigra..";
    const gptResult = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: gptQuery,
    });
    const getMovies = gptResult.text.split(",");
    const promiseResult = getMovies.map((movie) => searchMoviesTMDB(movie));
    const tmdbResults = await Promise.all(promiseResult);
    dispatch(addGptMovies({ movieName: getMovies, movieResults: tmdbResults }));
  };

  return (
    <div className=" pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder={lang[language].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded"
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
