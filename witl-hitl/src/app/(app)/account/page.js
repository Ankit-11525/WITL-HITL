import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import PageSettingsForm from "@/components/forms/PageSettingsForm";

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredusername = searchParams.username;
  if (!session) {
    return redirect("/");
  }
  mongoose.connect(process.env.MONGO_URI);

  const page = await Page.findOne({ owner: session?.user?.email });
  if (page) {
    return (
      <div >
        <PageSettingsForm page={page} user={session?.user}/>
      </div>
    );
  }
  return (
    <div>
      <UsernameForm desiredusername={desiredusername} />
    </div>
  );
}
