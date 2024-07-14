import React from "react";
import { useState, useEffect } from "react";
import { getEvents } from "@/firebase/firestore/events";

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
    <div className="p-6">
      <h1 className="text-grey font-koulen text-4xl mb-4">Events</h1>
      <div className="border border-grey mx-auto w-[80vw] px-6 py-4 rounded-md">
        {events && (
          <>
            <img src={events[0].data.pfp} alt="event image" />
            <p>{events[0].data.title}</p>
          </>
        )}
          </div>
          
      <a href="" className="p-2 bg-kaavi text-white my-5 mt-8 rounded-md block mx-auto w-fit">
        Load More
      </a>
    </div>
  );
}

export default Events;
