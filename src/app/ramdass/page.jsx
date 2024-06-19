"use client";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { MdOutlineCall } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { getRamadass } from "../../firebase/firestore/addData";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";

function Ramdass() {
  const [leader, setLeader] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const data = await getRamadass();
      setLeader(data);
      console.log(leader);
    };
    fetchdata();
  }, []);
  return (
    <div>
      <Header />
      <BackButton route="/" />
      <div className="p-6">
        <div className="flex flex-col justify-evenly items-center mb-10">
          <Image
            src={leader && leader.profile}
            alt="ramdass"
            height={100}
            width={100}
          ></Image>
          <h1 className="font-bold text-lg mt-3">{leader && leader.name}</h1>
          <h2 className="font-medium text-grey">HDRSS Leader</h2>
        </div>
        <p className="px-4 text-justify">{leader && leader.about}</p>
        <div className="mt-10">
          <h1 className="font-koulen text-4xl text-grey">Socials</h1>
          <YoutubeEmbed embedId={leader?.social} />
        </div>
        <div className="mt-10">
          <h1 className="font-koulen text-4xl text-grey">Contact</h1>
          <div className="flex mb-4 mt-8 items-center justify-evenly">
            <MdOutlineEmail fontSize={30} />
            <p className="ml-3">{leader && leader.email}</p>
          </div>
          <div className="flex items-center justify-evenly">
            <MdOutlineCall fontSize={30} />
            <p className="mr-16">{leader && leader.mobile}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Ramdass;
