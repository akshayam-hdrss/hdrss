"use client";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { IoSearch } from "react-icons/io5";
import { getEvents } from "@/firebase/firestore/events";

function Events() {
  const [events, setEvents] = useState();
  useEffect(() => {
    const fetchevents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchevents();
  });

  return (
    <div>
      <Header />
      <BackButton route="/" />
      <div className="p-6 flex justify-between items-center">
        <div>
          <h1 className="font-koulen text-4xl uppercase text-grey">Events</h1>
          <h2 className="text-lg font-bold text-grey">May 2024</h2>
        </div>
        <div className="p-2 border border-black w-fit h-fit rounded-xl">
          <IoSearch fontSize={30} className="text-kaavi" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Events;
