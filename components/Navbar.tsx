import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function Navbar() {


  const session = await auth();
  return (

    <>

      <header className="px-5 py-3 bg-white shadow-sm font-sans">
        <nav className="flex justify-between items-center">

          <Link rel="stylesheet" href="/" >

            <Image src="/logo.png" width={144} height={30} alt="Logo" />
          </Link>

          <div className="flex items-center gap-5">

            {
              session && session.user ? (
                <>

                  <Link href='/startup/create' className="">
                    <span className="max-sm:hidden">Create</span>
                    <BadgePlus className="size-6 sm:hidden" />

                  </Link>
                  <Button className="cursor-pointer btn text-white" onClick={async () => {
                    'use server'
                    await signOut({ redirectTo: "/" })
                  }}>
                    <span className="max-sm:hidden">Logout</span>
                    <LogOut className="size-6 sm:hidden text-white-500" />
                  </Button>

                  <Link href={`/user/${session?.id}`}>

                    <Avatar className="size-10">
                      <AvatarImage
                        src={session?.user?.image || ""}
                        alt={session?.user?.name || ""}
                      />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                  </Link>
                </>)

                :
                <>
                  <Button className="cursor-pointer btn text-white" onClick={async () => {

                    'use server'
                    await signIn("github")
                  }}>

                    <span className="">Login</span>
                  </Button>
                </>
            }
          </div>
        </nav>
      </header>
    </>

  )
}
