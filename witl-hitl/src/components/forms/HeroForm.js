"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";


export default function HeroForm() {
  const [username, setUsername] = useState("");

    useEffect(()=>{
        if('localStorage' in window 
            && window.localStorage.getItem('desiredUsername')
        ){
            console.log("render useEffect");
            const newusername=window.localStorage.getItem('desiredUsername');
            //console.log(username);
             window.localStorage.removeItem('desiredUsername');
            redirect('/account?username=' + newusername);

        }
    },[]);

  console.log("render");
  async function HandleSubmit(ev) {
    ev.preventDefault();
    // console.log(username);
    if(username.length>0){
        window.localStorage.setItem('desiredUsername',username);
        await signIn('google');
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
            onChange={(e)=>setUsername(e.target.value)}
            type="text" className="py-4" 
            placeholder="username" 
        />

        <button type="submit" className="bg-blue-500 py-4 px-6 text-white">
          Join for Free
        </button>
      </form>
    </div>
  );
}
