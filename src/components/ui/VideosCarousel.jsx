"use client";
import { Carousel } from "@material-tailwind/react";
import React from "react";
import YoutubeEmbed from "./YoutubeEmbed";

function VideosCarousel({ data }) {
  return (
    <Carousel
      autoplay="true"
      loop="true"
      className="rounded-md w-full z-10 my-4"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {data.map((item) => (
        <YoutubeEmbed embedId={item} />
      ))}
    </Carousel>
  );
}

export default VideosCarousel;
