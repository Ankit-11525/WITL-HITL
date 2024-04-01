"use client";

import RightIcon from "@/components/icons/RightIcon";
import grabUsername from "@/actions/grabUsername";
import { useState } from "react";
import { set } from "mongoose";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/buttons/SubmitButton"
export default function UsernameForm({ desiredusername }) {
  const [taken, setTaken] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  async function HandleSubmit(formData) {
    setIsLoading(true);

    const result = await grabUsername(formData);
    setIsLoading(false);
    setTaken(result === false);
    if (result) {
      redirect("/account/" + formData.get("username"));
    }
  }

  return (
    <form action={HandleSubmit}>
      <h1 className="text-4xl font-bold text-center mb-2  ">
        Grab your username
      </h1>
      <p className="text-center text-gray-500 mb-6">Choose your username</p>

      <div className="max-w-xs mx-auto">
        <input
          name="username"
          className=" block p-2  text-center mx-auto border w-full mb-4"
          type="text"
          defaultValue={desiredusername}
          placeholder={desiredusername}
        />

        {taken && (
          <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">
            This username is taken
          </div>
        )}

        <SubmitButton>
          <span>Claim your username</span>
          <RightIcon />
        </SubmitButton>
      </div>
    </form>
  );
}
