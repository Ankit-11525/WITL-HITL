"use server";

import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function grabUsername(formData) {
  const username = formData.get("username");
  // console.log(username);
  mongoose.connect(process.env.MONGO_URI);
  const exist = await Page.findOne({ uri: username });
  if (exist) {
    return false;
  } else {
    const session = await getServerSession(authOptions);

    return await Page.create({ uri: username, owner: session?.user?.email ,});
  }
}
