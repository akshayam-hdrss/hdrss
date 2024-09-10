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
import { submitFooterForm } from "../../firebase/firestore/footerform";

function Footer() {
  const [leader, setLeader] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitFooterForm(name, number, email);
    setName("");
    setNumber(0);
    setEmail("");
    setSubmitted(true);
  };
  useEffect(() => {
    const fetchdata = async () => {
      const data = await getRamadass();
      setLeader(data);
    };
    fetchdata();
  }, []);
  return (
    <div
      id="footer"
      className="bg-[#B72C00] text-primary lg:px-20 px-10 py-10 pb-4 mt-4"
    >
      <div className="grid grid-cols-2 gap-2 grid-rows-1 mb-6">
        <div className="lg:mr-auto">
          <div className="text-center">
            <Link href="/ramdass" className="flex justify-center">
              <img src="/ramdass.png" alt="Ram Dass" width={80} height={80} />
            </Link>
            <div>
              <h1 className="font-bold text-lg leading-6 mb-1">
                {leader.name}
              </h1>
              <h2 className="text-sm text-center">Founder/President</h2>
            </div>
          </div>
        </div>
        <Link
          href={"/about"}
          className="lg:flex items-center justify-center text-center lg:ml-auto"
        >
          <div className="flex justify-center">
            <Image src="/hdrss.png" alt="logo" width={80} height={80} />
          </div>
          <div className="lg:text-start text-center">
            <p className="font-semibold text-xl">Hindu Dharma Raksha Sena</p>
            <div className="hidden lg:block">
              <p>Coimbatore- 639386</p>
              <p>hdrss.cbe@gmail.com</p>
            </div>
          </div>
        </Link>
      </div>
      <section className="md:grid flex flex-col grid-cols-2 lg:grid-cols-4 gap-5 md:pt-8">
        <div className="md:mx-auto lg:m-0">
          <h1 className="text-white text-xl font-semibold">
            Contact Information
          </h1>
          <div className="text-white text-sm md:text-[16px] grid gap-3 pt-4">
            <Link href={"/"}>Phone : +91 9677717474</Link>
            <Link href={"/"}>Email : hdrss.in@gmail.com</Link>
            <Link href={"/"}>
              <h5 className="text-white">
                No: 13, Bhairavai 2nd Street, <br /> Edayarpalayam, <br />{" "}
                Coimbatore - 641 025
              </h5>
            </Link>
          </div>
        </div>

        <div className="col-span-2 flex justify-center w-full">
          <div className="lg:w-full md:min-w-[400px]">
            <h1 className="font-semibold text-center lg:text-xl pb-5">
              For Advertisements and Service promotion{" "}
            </h1>
            {submitted ? <div className="bg-[#D9D9D9] text-black rounded-xl p-8 pt-10">
              <form action="" className="grid gap-8">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full border-b-2 px-5 py-2 bg-transparent focus:outline-none border-black/40 placeholder:text-black/60"
                />
                <input
                  type="tel"
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full border-b-2 px-5 py-2 bg-transparent focus:outline-none border-black/40 placeholder:text-black/60"
                />
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border-b-2 px-5 py-2 bg-transparent focus:outline-none border-black/40 placeholder:text-black/60"
                />
                <input
                  type="submit"
                  value="Send"
                  onClick={handleSubmit}
                  className="bg-kaavi text-white text-xl font-semibold text-center w-full rounded-xl py-2"
                />
              </form>
            </div> : <div>
                
            </div> }
            
          </div>
        </div>
      </section>

      <div className="flex justify-center text-center py-8">
        <div className="lg:flex items-center gap-2">
          <h1>Copyright 2024@ All rights reserved</h1>
          <h1 className="mt-3 mb-1">This website was built by</h1>
          <div className="flex justify-center pt-2 lg:pt-0">
            <img
              src="/companylogo.png"
              alt=""
              className="lg:w-[200px] w-[180px]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center text-2xl gap-5">
        <FaFacebook />
        <FaYoutube />
        <FaTwitter />
        <FaInstagram />
      </div>
    </div>
  );
}

export default Footer;
