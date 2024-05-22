import React, { useState } from 'react';
import BasicLayout from '@/app/layouts/BasicLayout';
import Typography from '@/core/Typography';
import imageList from '@public/assets/house-images.json';

type ImageList = {
  outdoorKitchen: { path: string; images: string[] };
  other: { path: string; images: string[] };
  bedroom: { path: string; images: string[] };
}

const Pictures = () => {
  const groups = Object.keys(imageList).map((key) => imageList[key as keyof ImageList]);
  const images = groups.reduce((acc: any, curr: any) => {
    return acc.concat(curr.images);
  }, [])
  return (
    <BasicLayout>
      <Typography variant="h1">Pictures</Typography>
      <div>
        {images.map((image: string) => (
          <img src={image} />
        ))}
      </div>
    </BasicLayout>
  )
}

export default Pictures;
