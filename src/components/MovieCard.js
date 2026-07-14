import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCard = ({moviePoster}) => {
  return (
    <div className='w-48 m-2'>
        <img alt="movie-card" src={IMG_CDN+ moviePoster.poster_path} />
    </div>
  )
}

export default MovieCard