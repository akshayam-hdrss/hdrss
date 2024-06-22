"use client";
import React, { useEffect, useState } from "react";

const handleEmbed = (embedId) => {
  const videoId = extractVideoId(embedId);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
};

const extractVideoId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
const YoutubeEmbed = ({ embedId }) => {
  const [id, setId] = useState();
  useEffect(() => {
    const fetch = () => {
      if (embedId) {
        setId(handleEmbed(embedId));
      }
    };
    fetch();
  }, [embedId]);
  return (
    <div className="overflow-hidden relative h-fit">
      {id && (
        <iframe
          width="353"
          height="200"
          src={id}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          className="rounded-lg mx-auto"
        />
      )}
    </div>
  );
};

export default YoutubeEmbed;
