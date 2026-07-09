import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isLoginForm,setIsLoginForm]=useState(true)
  const toggleSignInForm=()=>{
   setIsLoginForm(!isLoginForm)
  }
  return (
    <div >
      <Header />
      <img className='absolute '  alt="cover-image" src="https://assets.nflxext.com/ffe/siteui/vlv3/2f42605e-e786-4a06-8612-ebc67c55ba6c/web/IN-en-20260629-TRIFECTA-perspective_76b17e8c-cff9-4c65-9938-08ca5029be6b_medium.jpg"/>
      <form className='absolute w-3/12 p-4 text-white right-0 left-0 my-40 mx-auto bg-black rounded-lg bg-opacity-80'>
      <h1 className='font-bold m-2 text-3xl'>{isLoginForm?"Sign In":"Sign Up"}</h1>
       {!isLoginForm&& <input type="text" placeholder='Full Name' className='py-2 px-2 bg-gray-700 my-4 w-full'/>}
        <input type="text" placeholder='Email Address' className='py-2 px-2 bg-gray-700 my-4 w-full'/>
        <input type="password" placeholder='Password' className='py-2  px-2 bg-gray-700 my-4 w-full'/>
        <button className='py-2 my-4 bg-red-600 text-white w-full rounded-lg'>{isLoginForm?"Sign In":"Sign Up"}</button>
      <p className='p-2 m-2' onClick={toggleSignInForm}>{isLoginForm?"New to Netflix? Sign Up Now":"Already registered? Sign In Now"}</p>
      </form>
       </div>
  )
}

export default Login