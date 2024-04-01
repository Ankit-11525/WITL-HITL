import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";

export default async  function Account({searchParams}){

    const session=await getServerSession(authOptions);
    const desiredusername=searchParams.username;
    console.log(session)
    if(!session){
        redirect('/');
    }
    // console.log(req);
    // console.log(res);
    return (
        <div>
            <UsernameForm  desiredusername={desiredusername} />
        </div>
    )
}