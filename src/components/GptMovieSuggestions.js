import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
 const gpt=useSelector(store=>store.gpt)
 if(!gpt.gptMovies) return null;
 

 const {movieResults,movieName}=gpt.gptMovies
  if(!movieResults) return null;
 if(!movieName) return null;
 
  return (
    <div className='bg-black p-4 m-4 text-white bg-opacity-80'>
     {movieName.map((movie,index)=>(<MovieList key={movie} title={movie} movies={movieResults[index]}/>))}
    </div>
  )
}

export default GptMovieSuggestions