import React from 'react';
import { getAllPostIds, getPostData } from '@/app/lib/posts';
import markdownToHtml from '@/app/lib/markdownToHtml';
import './blog-styles.css'
// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
// Blog example: https://github.com/vercel/next.js/tree/canary/examples/blog-starter

export default async function Post () {
  const postDataIds = getAllPostIds();
  const id = postDataIds[0].params.id;
  const postData = getPostData(id);
  // console.log(postData.content);
  const html = await markdownToHtml(postData.content || '');
  console.log(html)
  return (
    <article className="blog-parent p-3">
      <div className="blog-title">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left" >
          {postData.title}
        </h1>
        
        {postData.id}
        <br />
        {postData.date}
      </div>
      
      <br />
      <div className="blog-content max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
