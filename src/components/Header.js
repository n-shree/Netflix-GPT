import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { logoURL, supportedLanguage, User_Avatar } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";



const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
    const showGptSearchView=useSelector(store=>store.gpt.showGptSearch)
  
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick=()=>{
    //toggle page- onclick show Gpt search page
    dispatch(toggleGptSearchView())
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className=" justify-between flex w-full absolute px-8 py-5 bg-gradient-to-b from-black z-10">
      <img
        className="w-40"
        alt="logo"
        src={logoURL}
      />
      {user && (
        <div className="mx-5 flex">
       {showGptSearchView &&<select onChange={handleLanguageChange} className="">
          {supportedLanguage.map(lang=>{
            return <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
          })}
        </select>}
         <button onClick={handleGptSearchClick} className="bg-cyan-700 text-white text-sm font-bold rounded px-2 mx-2 hover:bg-cyan-400">{showGptSearchView?"Home Page":"GPT Search"}</button>
      
           <img
            className=" w-8 h-8 my-1"
            alt="userIcon"
            src={User_Avatar}
          />
          
          <button
            onClick={handleSignOut}
            className="rounded-sm text-white font-bold "
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
