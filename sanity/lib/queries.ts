import { defineQuery } from "next-sanity";

export const startups_query = defineQuery(`*[_type=='startup'
&& defined(slug.current)
&& !defined($search)
|| title match $search
|| author->name match $search
|| category match $search
 ] | order(_createdAt desc) {
  _id, title, slug, _createdAt, author ->{
    _id, name, image, bio, username
  }, views, description, category, image


}
`)


export const startupbyid_query = defineQuery(`*[_type=='startup' && _id==$id][0]{
  _id, title, slug, _createdAt, author ->{
    _id, name, image, bio, username
  }, views, description, category, image, pitch


}`)


export const startup_view_query = defineQuery(`*[_type=='startup' && _id==$id][0]{
  _id, views


}`)


export const author_by_githubid_query = defineQuery(
  ` *[_type=='author' && id==$id][0]{
     _id, name, username, image, bio, email

 }
 `

)


export const author_by_id_query = defineQuery(
  ` *[_type=='author' && _id==$id][0]{
     _id, name, username, image, bio, email

 }
 `
)

export const startups_by_author = defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  },
  views,
  description,
  category,
  image,
}`)


export const playlist_by_slug_query =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);
