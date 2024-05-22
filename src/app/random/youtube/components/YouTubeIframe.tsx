import React from 'react';

const YouTubeEmbed = ({ link }: { link: string}) => {
  // Function to extract the video ID from the YouTube link
  const getYouTubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const videoId = getYouTubeId(link);

  if (!videoId) {
    return <p>Invalid YouTube link</p>;
  }

  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube video player"
    ></iframe>
  );
};

export default YouTubeEmbed;
