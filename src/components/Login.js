import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { User_Avatar } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignInForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value,
    );
    setErrMessage(message);
    if (message) return;
    if (!isLoginForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:User_Avatar
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );
            })
            .catch((error) => {
              setErrMessage(error.message);
            });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + errorMessage);
        });



    } else {
      //sign in logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <img
        className="absolute "
        alt="cover-image"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/2f42605e-e786-4a06-8612-ebc67c55ba6c/web/IN-en-20260629-TRIFECTA-perspective_76b17e8c-cff9-4c65-9938-08ca5029be6b_medium.jpg"
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-4 text-white right-0 left-0 my-40 mx-auto bg-black rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold m-2 text-3xl">
          {isLoginForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isLoginForm && (
          <input
           ref={name}
            type="text"
            placeholder="Full Name"
            className="py-2 px-2 bg-gray-700 my-4 w-full"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="py-2 px-2 bg-gray-700 my-4 w-full"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="py-2  px-2 bg-gray-700 my-4 w-full"
        />
        <p className="text-red-800">{errMessage}</p>
        <button
          onClick={handleButtonClick}
          className="py-2 my-4 bg-red-600 text-white w-full rounded-lg"
        >
          {isLoginForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-2 m-2" onClick={toggleSignInForm}>
          {isLoginForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
