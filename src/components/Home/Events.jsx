import React from "react";
import { useState, useEffect } from "react";
import { getEvents } from "@/firebase/firestore/events";
import Image from "next/image";

function Events() {
  const [events, setEvents] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchdata();
  }, []);
  return (
    <div className="p-6 relative overflow-hidden">
      <Image
        src="/om.svg"
        alt="om"
        width={300}
        height={300}
        className="rotate-45 opacity-[0.04] absolute right-7 -top-4 -z-10"
      ></Image>
      <h1 className="text-grey font-koulen text-4xl mb-4">Events</h1>
      <div className="border border-grey md:border-none mx-auto w-[80vw] md:w-full rounded-md bg-white md:bg-inherit">
        {events && (
          <>
            <div className="md:grid grid-cols-2">
              <div className="bg-white">
              <img
                src={events[0].data.pfp}
                alt="event image"
                className="w-full object-contain m-auto"
              />
              </div>
              <div className="px-5 py-5 md:py-10 flex flex-col justify-between">
                <p>{events[0].data.title}</p>
                <div className="flex justify-end">
                  <h1 className="py-2 px-3 rounded-xl bg-kaavi text-white">
                    Read More
                  </h1>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <a
        href=""
        className="p-2 bg-kaavi text-white my-5 mt-8 rounded-md block mx-auto w-fit"
      >
        Load More
      </a>
    </div>
  );
}

export default Events;
