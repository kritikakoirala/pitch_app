import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { playlist_by_slug_query, startupbyid_query } from "@/sanity/lib/queries"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import markdownit from 'markdown-it'
import View from "@/components/View"
import StartupCard from "@/components/StartupCard"
import { StartupTypeCard } from "@/components/UserStartups"


// export const experimental_ppr = true


const md = markdownit()


export default async function Startup({ params }: { params: Promise<{ id: string }> }) {

  const id = (await params).id

  const [startup, { select: picks }] = await Promise.all([
    client.fetch(startupbyid_query, {
      id: id
    }),
    client.fetch(playlist_by_slug_query,
      { slug: 'editorial-picks' }
    )

  ])

  if (!startup) return notFound()
  const parsedContent = md.render(startup?.pitch || "")

  return (
    <>

      <section className="pink_container !min-h-[230px]">
        <p className="tag">
          {formatDate(startup?._createdAt)}
        </p>
        <h1 className="heading">{startup?.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup?.description}</p>
      </section>

      <section className="section_container">


        {/*<div className=" relative ">*/}
        {/* <Image
          src={startup?.image || null}
          alt={startup?.title}
          width={800}
          height={600}
        // fill
        // className="w-full aspect-3/2 object-contain rounded-xl "
        />*/}
        {/*</div>*/}

        <img src={startup?.image || null}
          className="w-full mx-auto md:w-100 object-cover  rounded-xl"
          alt={startup?.title || "Startup Image"}
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${startup?.author?._id}`} className="flex gap-2 items-center mb-2">
              <Image src={startup?.author?.image || null} alt="Author Thumbnail" width={64} height={64} className="rounded-full drop-shadow-lg" />

              <div>
                <p className="text-20-medium">{startup?.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{startup?.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{startup?.category}</p>

          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}

        </div>
        <hr className="divider" />

        {/*editorial picks*/}


        {
          picks &&

            picks?.length > 0 ?
            picks?.length > 0 && (
              <div className="max-w-4xl mx-auto">
                <p className="text-30-semibold">Editor Picks</p>

                <ul className="mt-7 card_grid-sm">
                  {picks.map((post: StartupTypeCard, i: number) => (
                    <StartupCard key={i} post={post} />
                  ))}
                </ul>
              </div>
            )
            :
            ''
        }

      </section>

      <View id={id} />
    </>
  )
}
