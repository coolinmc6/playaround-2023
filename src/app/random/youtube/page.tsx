"use client"

import React, { useState } from 'react';
import YouTubeEmbed from './components/YouTubeIframe';
import Button from '@/core/Button';
import BasicLayout from '@/app/layouts/BasicLayout';
import Typography from '@/core/Typography';

const links = [
  "https://youtu.be/0-Rr8UhaZ9Y?si=ZYtebG5xuoFD8d0C",
  "https://youtu.be/7YjY00Cd_MI?si=EM-shoVh0SneGxYi"
]

const YouTube = () => {
  const [currentLink, setCurrentLink] = useState(0)

  return (
    <BasicLayout>

        <Typography variant="h1">YouTube Embed</Typography>
        <div>
          <Button onClick={() => setCurrentLink(0)}>Video 1</Button>
          <Button onClick={() => setCurrentLink(1)}>Video 2</Button>
          <YouTubeEmbed link={links[currentLink]} />
        </div>
    </BasicLayout>
  )
}

export default YouTube;
