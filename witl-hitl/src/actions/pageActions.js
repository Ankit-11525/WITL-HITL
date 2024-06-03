"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function savePageSettings(formData, bgColor, bgImage,avatar) {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);

  if (session) {
    const dataKeys = ["displayName", "location", "bio", "bgType", "bgColor"];

    const dataToUpdate = {};
    for (const key of dataKeys) {
      if (formData.has(key)) {
        dataToUpdate[key] = formData.get(key);
      }
    }

    if (bgColor) dataToUpdate["bgColor"] = bgColor;
    if (bgImage) dataToUpdate["bgImage"] = bgImage;

    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);
    if(avatar) await User.updateOne({email:session?.user?.email},{image:avatar});
    console.log("ankit:" ,avatar);

    return true;
  }
  return false;
}
