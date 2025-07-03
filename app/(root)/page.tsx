import { auth } from "@/auth";
import Input from "@/components/Input";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { startups_query } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query

  const params = {
    search: query || null
  }

  // const posts = await client.fetch(startups_query)
  const posts = await sanityFetch({ query: startups_query, params: params })


  // console.log(posts)

  return (
    <>


      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup
          <br />Connect with entreprenaurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches and Get noticed in Virtual Combinations
        </p>

        <Input query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {
            query ? `Search Results for ${query}` : 'All Startups'
          }
        </p>

        <ul className="mt-7 card_grid">

          {
            posts?.data?.length > 0 &&

            posts?.data?.map((post: StartupCardType) => {
              return <StartupCard
                key={post?._id}
                post={post}
              />
            })
          }
        </ul>
      </section>

      <SanityLive />
    </>
  )
}
