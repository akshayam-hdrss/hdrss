import React from "react";
import { useState, useEffect } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import { getNews } from "@/firebase/firestore/news";
import YoutubeEmbed from "../ui/YoutubeEmbed";

function News() {
  const [news, setNews] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getNews();
      setNews(data);
    };
    fetch();
  }, []);
  return (
    <div className="px-0 pt-8 relative z-0">
      <h1 className="font-koulen text-4xl text-grey mb-4 px-6">News</h1>

      <Carousel
        className="h-[400px]"
        prevArrow={false}
        nextArrow={false}
        navigation={false}
        autoplay={true}
        loop
      >
        {news &&
          news.map((doc, index) => (
            <div key={index} className="relative h-full w-full">
              <div className="absolute inset-0 grid h-full w-full bg-kaavi/0">
                <YoutubeEmbed embedId={doc.video} />
                <h1 className="px-6 text-lg font-bold">
                  {doc.title.slice(0, 40)}...
                </h1>
                <button className="text-center mx-auto mb-12 px-3 rounded-md bg-kaavi text-white w-fit">
                  Read More
                </button>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default News;
