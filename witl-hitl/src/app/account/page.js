import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import RightIcon from "@/components/icons/RightIcon";
import grabUsername from "@/actions/grabUsername";

export default async  function Account({searchParams}){

    const session=await getServerSession(authOptions);
    const username=searchParams.username;
    console.log(session)
    if(!session){
        redirect('/');
    }
    // console.log(req);
    // console.log(res);
    return (
        <div>
            <form action={grabUsername}>
            <h1 className="text-4xl font-bold text-center mb-2  " >Grab your username</h1>
            <p className="text-center text-gray-500 mb-6">Choose your username</p>

            <div className="max-w-xs mx-auto">
                <input 
                name="username"
                className=" block p-2  text-center mx-auto border w-full mb-4" 
                type="text" 
                defaultValue={username}
                placeholder={username} />

                <button 
                    type="submit"
                    className="bg-blue-500 w-full py-2 px-4 text-white flex justify-center
                    gap-2 items-center " 
                >
                    <span>Claim your username</span>
                    <RightIcon/>
                </button>
            </div>
            </form>
        </div>
    )
}