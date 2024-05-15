import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import LoginWithGithub from "@/components/buttons/LoginWithGithub";

import React from "react";

export default function LoginPage() {
  return (
    <div>
      <div className="p-4 max-w-xs m-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Sign In</h1>

        <p className="text-center text-gray-500 mb-6">
          Sign In to your account using one of the options given below
        </p>
        <LoginWithGoogle />
        <LoginWithGithub/>
      </div>
    </div>
  );
}
