import { client } from "@/sanity/lib/client"
import { startups_by_author } from "@/sanity/lib/queries"
import StartupCard from "./StartupCard"
import { Author, Startup } from "@/sanity/types";



export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

export default async function UserStartups({ id }: { id: string }) {

  const startups = await client.fetch(startups_by_author, { id: id })

  return (

    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  )

}
