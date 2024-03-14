"use client"

import React from 'react';
import RoughCard from '@/core/RoughCard';
import { ParagraphType, LinkType } from '@server/data/types';

type DisplayContentProps = {
  item: ParagraphType & {
    links: LinkType[];
  }
}

const DisplayContent = ({ item }: DisplayContentProps) => {
  const content = Object.keys(item).filter((key) => {
    return key.substring(0, 7) === 'content' as string
  }).map((key: string) => (item as any)[key])
  return (
    <RoughCard title={item.title} key={item.id}>
      <div><strong>Topic:</strong> {item.topic}</div>
      <div><strong>SubTopic:</strong> {item.subtopic}</div>
      <div className="pb-2 pt-2">{item.content1}</div>
      <div>{item.content2}</div>
      <div>
        <strong>Links</strong><br />
        {item.links.length ? item.links.map((link: any) => {
          // console.log(link)
          return (
            <div key={link?.id}>
              {link?.a_href}
            </div>
          )
        }) : (
          <div>No Links</div>
        )}
      </div>
    </RoughCard>
  )
}



export default DisplayContent;
