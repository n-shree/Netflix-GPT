import React from 'react'

function VideoTitle({title,overview}) {
  return (
    <div className='w-full aspect-video pt-40 pl-20 absolute text-white bg-gradient-to-r from-black' >
        <h1 className='font-bold text-4xl'>{title}</h1>
        <p className='text-sm pt-5 w-4/12'>{overview}</p>
        <div className='py-2'>
        <button className='px-10 p-2 m-1 bg-white text-lg text-black rounded hover:bg-opacity-50'> ▶Play</button>
        <button className='px-10 p-2 m-1 bg-slate-400 text-lg text-white rounded'>❕More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle