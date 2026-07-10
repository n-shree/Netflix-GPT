import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const user=useSelector(store=>store.user)
  const dispatch=useDispatch()
   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName ,photoURL} = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName,photoURL:photoURL }));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
  }, []);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
       navigate("/error")
      });
  };
  
  return (
    <div className=" justify-between flex w-screen absolute px-8 py-5 bg-gradient-to-b from-black z-10">
      <img
        className="w-40"
        alt="logo"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAeuLioOK1ZSC8bQbffYbz1gZFxugAQdkx7UsMvqKDtFJLk3EWkpY-w8IBimYy_0xmg1aTzugh7JDHsGzv6hqIL9_qklFo-PFSH81MwCe9rokU4kGkdki.svg"
      />
     { user&&<div className="mx-5">
        <img
          className=" w-8 h-8"
          alt="userIcon"
          src="https://lh3.googleusercontent.com/a/ACg8ocJ9StTDzncqBtO7x_K9YI-w880IPfh65QF_1iu-qaaUreHSiUlE=s432-c-no"
        />
        <button
          onClick={handleSignOut}
          className="rounded-sm text-white font-bold "
        >
          Log Out
        </button>
      </div>}
    </div>
  );
};

export default Header;
