import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { startup_view_query } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";


export default async function View({ id }: { id: string }) {

  // const startup = await client.fetch(startup_view_query, { id: id })
  // const totalViews = await startup.views


  const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(startup_view_query, { id: id })



  await writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit()


  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  )
}
