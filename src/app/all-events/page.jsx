import React from "react";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { IoSearch } from "react-icons/io5";

function Events() {
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
