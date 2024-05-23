import React, { useState } from 'react';
import BasicLayout from '@/app/layouts/BasicLayout';
import Typography from '@/core/Typography';
import imageList from '@public/assets/house-images.json';

type ImageList = {
  outdoorKitchen: { path: string; images: string[] };
  other: { path: string; images: string[] };
  bedroom: { path: string; images: string[] };
}

const productivity = [
  "/assets/productivity/10x-productivity.jpeg",
  "/assets/productivity/12-productivity-hacks.jpeg",
  "/assets/productivity/80-20-leader.jpeg",
  "/assets/productivity/80-20-rule.jpeg",
  "/assets/productivity/end-procrastination.jpeg",
  "/assets/productivity/get-shit-done.jpeg",
  "/assets/productivity/productivity-sentences.jpeg",
  "/assets/productivity/reclaim-40-hours.jpeg"
]

const Pictures = () => {
  const groups = Object.keys(imageList).map((key) => imageList[key as keyof ImageList]);
  const images = groups.reduce((acc: any, curr: any) => {
    return acc.concat(curr.images);
  }, [])
  images.push(...productivity)

  console.log(images)
  return (
    <BasicLayout>
      <Typography variant="h1">Pictures</Typography>
      <div>
        {images.map((image: string) => (
          <img src={image} key={image}/>
        ))}
      </div>
    </BasicLayout>
  )
}

export default Pictures;
