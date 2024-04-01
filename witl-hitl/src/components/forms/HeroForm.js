"use client";

import { signIn } from "next-auth/react";
import { redirect,useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function HeroForm({ user }) {
  const [username, setUsername] = useState("");
  console.log(user);
  const router=useRouter();

  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desiredUsername")
    ) {
      console.log("render useEffect");
      const newusername = window.localStorage.getItem("desiredUsername");
      //console.log(username);
      window.localStorage.removeItem("desiredUsername");
      redirect("/account?username=" + newusername);
    }
  }, []);

  console.log("render");
  async function HandleSubmit(ev) {
    ev.preventDefault();
    if (username.length > 0) {
      if (user) {
        console.log(user);
        router.push('/account?desiredUsername=' + username);
      } else {
        window.localStorage.setItem("desiredUsername", username);
        await signIn("google");
      }
    }
  }

  return (
    <div>
      <form
        className="inline-flex items-center shadow-lg shadow-gray-700/20"
        onSubmit={HandleSubmit}
      >
        <span className="py-4 bg-white pl-4">witl-hitl.to/</span>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="py-4"
          placeholder="username"
        />

        <button type="submit" className="bg-blue-500 py-4 px-6 text-white">
          Join for Free
        </button>
      </form>
    </div>
  );
}
