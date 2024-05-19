'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

const savePageSettings = async (formData) => {
  mongoose.connect(process.env.MONGO_URI);
  const session = getServerSession(authOptions);
  const displayName = formData.get("displayName");
  const location = formData.get("location");
  const bio = formData.get("bio");
  if (session) {
    Page.updateOne(
      {
        owner: session?.user?.email,
      },
      {
        displayName,
        location,
        bio,
      }
    );
    return true;
  } else return false;
};

export default savePageSettings;
