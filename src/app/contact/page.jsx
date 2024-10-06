"use client";
import React, { useState } from "react";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
function contactPage() {
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
  return (
    <div>
      <Header />
      <BackButton />
      <div className="p-6">
        <h1 className="font-koulen text-4xl text-grey mb-10">Contact Us</h1>

        <section className="md:grid flex flex-col grid-cols-2 lg:grid-cols-4 gap-5 md:pt-8">
          <div className="md:mx-auto lg:m-0">
            <h1 className="text-black text-xl font-semibold">
              Contact Information
            </h1>
            <div className="text-black grid gap-3 pt-4">
              <Link href={"/"}>Phone : +91 9677717474</Link>
              <Link href={"/"}>Email : hdrss.in@gmail.com</Link>
              <Link href={"/"}>
                <h5 className="text-black">
                  No: 13, Bhairavai 2nd Street, <br /> Edayarpalayam, <br />
                  Coimbatore - 641 025
                </h5>
              </Link>
            </div>
          </div>

          <div className="col-span-2 flex justify-center w-full mt-10">
            <div className="lg:w-full md:min-w-[400px]">
              <h1 className="font-semibold text-xl pb-5">
                For Advertisements and Service promotion{" "}
              </h1>
              {!submitted ? (
                <div className="bg-[#D9D9D9] text-black rounded-xl p-8 pt-10">
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
                </div>
              ) : (
                <div className="bg-black flex items-center justify-center text-kaavi py-2 rounded-2xl font-bold text-center">
                  <IoIosDoneAll fontSize={40} />

                  <h1>Your request form is submitted</h1>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-row justify-center items-center text-2xl gap-5 mt-10">
          <FaFacebook />
          <FaYoutube />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default contactPage;
