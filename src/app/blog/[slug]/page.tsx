import React from 'react';
import { getAllPostIds, getPostData } from '@/app/lib/posts';
import { get } from 'http';
// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes

export default function Post () {
  const postData = getAllPostIds()[0]
  console.log(postData)
  return (
    <div>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </div>
  );
}

// export async function getStaticPaths() {
//   const paths = getAllPostIds();
//   console.log(paths);
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }: any) {
//   const postData = getPostData(params.id);
//   console.log(postData);
//   return {
//     props: {
//       postData,
//     },
//   };
// }
