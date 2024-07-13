"use client";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getRamadass } from "@/firebase/firestore/ramadass";

function Footer() {
  const [leader, setLeader] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const data = await getRamadass();
      setLeader(data);
     
    };
    fetchdata();
  }, []);
  return (
    <div className="bg-kaavi text-primary px-4 py-10 pb-4 mt-4">
      <div className="grid grid-cols-2 gap-2 grid-rows-1 mb-6">
        <div className="flex flex-col items-center">
          <Link href="/ramdass">
            <img src="/ramdass.png" alt="Ram Dass" width={80} height={80} />
          </Link>
          <div>
            <h1 className="font-bold text-lg leading-6 mb-1">{leader.name}</h1>
            <h2 className="text-sm text-center">Founder/President</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <Image src="/hdrss.png" alt="logo" width={80} height={80} />
          <p className="text-xs text-center">இந்து தர்ம ரக்ஷ சேனா</p>
          <p className="text-xs text-center">हिंदू धर्म रक्षा सेना</p>
          <p className="text-xs text-center">Hindu Dharma Raksha Sena</p>
        </div>
      </div>


      <div className="flex flex-col">
        <div className="flex text-base/7 flex-col justify-center items-center">
          <a href="">Privacy Policy</a>
          <a href="">Terms and Conditions</a>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center pt-4">
        <FaFacebook fontSize={40} className="px-3" />
        <FaYoutube fontSize={40} className="px-3" />
        <FaTwitter fontSize={40} className="px-3" />
        <FaInstagram fontSize={40} className="px-3" />
      </div>
    </div>
  );
}

export default Footer;
