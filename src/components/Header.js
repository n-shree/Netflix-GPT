import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { logoURL, User_Avatar } from "../utils/constants";


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
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

  return (
    <div className=" justify-between flex w-screen absolute px-8 py-5 bg-gradient-to-b from-black z-10">
      <img
        className="w-40"
        alt="logo"
        src={logoURL}
      />
      {user && (
        <div className="mx-5">
          <img
            className=" w-8 h-8"
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
