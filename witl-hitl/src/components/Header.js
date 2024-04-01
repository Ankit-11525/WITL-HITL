import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./buttons/LogoutButton";
export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-white border-b py-6 ">
      <div className="max-w-4xl mx-auto flex justify-between px-6 ">
        <div className="flex  flex-row  gap-6 items-center  ">
          <Link href={"/"}>WITL-HITL</Link>
          <nav className=" flex items-center gap-4 text-slate-500 text-sm">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-slate-500 text-sm">
          
        {
            !!session && (<>
            <Link href={'/account'}>
            <div> Hello!  {session?.user?.name}</div>
            </Link>
            <LogoutButton />
            
            </>)
          }
          
          
          {!session && (
            <>
              <Link href={"/login"}>Sign In</Link>
              <Link href={"/register"}> Create Account</Link>
            </>
          )}
          
        </div>
      </div>
    </header>
  );
}
