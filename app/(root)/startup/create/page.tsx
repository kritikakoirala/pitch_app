import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

export default async function Create() {

  const session = await auth()
  return (

    <>
      <section className="pink_container min-h-[230px]">
        <h1 className="heading">
          Submit Your Startup Pitch
        </h1>
      </section>
      {
        !session ? redirect('') : <StartupForm />
      }
    </>
  )
}
