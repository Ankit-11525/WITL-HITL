"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";
const LoginWithGoogle = () => {
  return (
    <div>
      <button
        onClick={() => signIn('google')}
        className="bg-white shadow text-center w-full py-4 flex justify-center gap-2 mb-3 "
      >
        <FontAwesomeIcon icon={faGoogle} className="w-6 text-center " />
        <span>Sign In with Google</span>
      </button>
    </div>
  );
};

export default LoginWithGoogle;
