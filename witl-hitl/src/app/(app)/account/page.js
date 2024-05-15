import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/page";
import mongoose from "mongoose";


export default async  function Account({searchParams}){

    const session=await getServerSession(authOptions);
    const desiredusername=searchParams.username;
    console.log(session)
    if(!session){
       return redirect('/');
    }
    mongoose.connect(process.env.MONGO_URI);

    const page = await Page.findOne({owner: session?.user?.email});
    if(page)
    {
        return (
            <div>
                this is url for {page.uri}
            </div>
        )
    }
    return (
        <div>
            <UsernameForm  desiredusername={desiredusername} />
        </div>
    )
}