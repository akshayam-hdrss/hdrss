"use client";
import Image from "next/image";
import { Carousel } from "@material-tailwind/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import EventCarousel from "@/components/EventCarousel";
import { useState } from "react";
import ExploreCarousel from "@/components/ExploreCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Level1Services from "@/components/Level1Services";
export default function Home() {
  const [isEventActive, setIsEventActive] = useState(true);
  const handleArchiveClick = () => {
    setIsEventActive(false);
  };
  const handleEventClick = () => {
    setIsEventActive(true);
  };
  const dynamicContent = [
    {
      image: "/event.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elitewrewriowioqrioetriqriuoinfviojrijoijgoirjtjwritq.",
    },
    {
      image: "/event.jpg",
      text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "/event.jpg",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const dynamicContent2 = [
    {
      image: "/event.jpg",
      text: "content 2 Lorem ipsum dolor sit amet, consectetur adipiscing elitewrewriowioqrioetriqriuoinfviojrijoijgoirjtjwritq.",
    },
    {
      image: "/event.jpg",
      text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "/event.jpg",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];
  return (
    <>
      <Header />
      <div>
        {/* Hero Section */}

        <div
          style={{
            background:
              "linear-gradient(180deg, hsla(172, 73%, 94%, 1) 0%, hsla(18, 92%, 62%, 1) 100%)",
          }}
          className="relative pt-30 h-[45vh] pb-0 flex flex-row items-center justify-center z-0"
        >
          {/* Location */}

          <Link
            href="/location"
            className="bg-white z-10 absolute top-5 left-2 px-2 py-2 flex items-center justify-around rounded-3xl cursor-pointer shadow-md"
          >
            <MdLocationOn fontSize={28} className="pr-1 text-[#E53700]" />
            <p className="font-bold text-secondary">Coimbatore</p>
            <RiArrowDropDownLine fontSize={30} />
          </Link>

          <Image
            src="/temple-bells.png"
            alt="temple-bells"
            width={150}
            height={150}
            className="opacity-30 absolute top-0 right-0 z-0"
          />

          <Carousel
            autoplay="true"
            loop="true"
            className="rounded-xl h-52 w-[95%] z-10 mt-8"
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
            <img
              src="/advertisement.jpg"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
              className="h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
              alt="image 3"
              className="h-full w-full object-cover"
            />
          </Carousel>
          <Image
            src="/ram-temple.png"
            alt="ram-temple"
            width={150}
            height={150}
            className="z-0 opacity-30 absolute left-0 bottom-0"
          />
        </div>

        {/* Services Section */}

        <div className="bg-background text-black relative w-full h-max pt-10 px-6 z-10 overflow-hidden rounded-[30px] -mt-10">
          <Image
            src="/om.svg"
            alt="om"
            width={300}
            height={300}
            className="rotate-45 opacity-5 absolute -right-7 -top-16 -z-10"
          />
          <h1 className="font-koulen text-4xl text-grey mb-8">Services</h1>
          <div className="grid grid-cols-3 gap-y-10 gap-x-4 items-center justify-center">
            <Level1Services />
          </div>
          <Link
            href="/services"
            className="flex flex-row justify-center items-center border-black border w-fit mx-auto mt-10 px-3 py-2 rounded-2xl cursor-pointer"
          >
            <p>See all services</p>
            <IoIosArrowDown className="ml-1" />
          </Link>
        </div>

        {/* Socials Section */}
        <div className="px-6 py-8 relative z-0">
          <Image
            src="/om.svg"
            alt="om"
            width={300}
            height={300}
            className="rotate-45 opacity-5 absolute -left-7 -top-2 -z-10"
          />
          <h1 className="font-koulen text-4xl text-grey mb-6">socials</h1>
          <YoutubeEmbed embedId="1Cl6ST2hbdg" />
        </div>

        {/* Events Section */}
        <div className="p-6 text-center">
          <div
            className={`bg-[#FBE9E9] inline p-5 rounded-lg mr-10 pt-7 cursor-pointer ${
              isEventActive ? "text-kaavi" : "text-[#ACACAC]"
            }`}
          >
            <button
              className="font-koulen text-4xl inline"
              onClick={handleEventClick}
            >
              Events
            </button>
          </div>
          <div className="bg-[#FBE9E9] inline p-5 rounded-lg pt-7">
            <button
              className={`font-koulen text-4xl ${
                isEventActive ? "text-[#ACACAC]" : "text-kaavi"
              }`}
              onClick={handleArchiveClick}
            >
              archive
            </button>
          </div>
          <EventCarousel
            content={isEventActive ? dynamicContent : dynamicContent2}
          />

          <button className="p-2 bg-kaavi text-white my-5 mt-8 rounded-md">
            Load More
          </button>
        </div>

        {/* Products Section */}
        <div className="p-6">
          <h1 className="font-koulen text-4xl text-grey mb-6">Products</h1>
          <div className="grid grid-cols-3 gap-y-10 gap-x-10">
           
          </div>
          <div className="flex flex-row justify-center items-center border-black border w-fit mx-auto mt-10 px-3 py-2 rounded-2xl cursor-pointer">
            <Link href="#">See all products</Link>
            <IoIosArrowDown className="ml-1" />
          </div>
        </div>

        {/* Explore Section */}
        <div className="py-6">
          <h1 className="px-6 font-koulen text-4xl text-grey mb-6">explore</h1>

          <ExploreCarousel />
        </div>

        {/* Social complaints */}
        <div className="p-6 relative overflow-hidden z-0">
          <Image
            src="/om.svg"
            alt="om"
            width={300}
            height={300}
            className="rotate-45 opacity-[0.04] absolute right-7 -top-4 -z-10"
          ></Image>
          <h1 className="font-koulen text-4xl text-grey mb-6">
            Social Complaints
          </h1>
          <p className="text-justify px-2">
            Complaint if you have any problem in your area or location. After
            submitting your complaint, you will be contacted by our members and
            the complaint will be resolved by us as soon as possible.
          </p>
          <div className="text-center">
            <button className="bg-kaavi text-white p-3 mt-6 rounded-xl">
              Make a complaint
            </button>
          </div>
        </div>

        {/* Join us */}
        <div className="p-6 relative overflow-hidden z-0">
          <Image
            src="/om.svg"
            alt="om"
            width={300}
            height={300}
            className="rotate-45 opacity-[0.04] absolute right-7 -top-4 -z-10"
          ></Image>
          <h1 className="font-koulen text-4xl text-grey mb-6">Join us</h1>
          <p className="text-justify px-2">
            Sign up to become a member and make a positive impact in your
            community and beyond. Let's collaborate to build a stronger Tamil
            Nadu.
          </p>
          <div className="text-center">
            <button className="bg-kaavi text-white p-3 mt-6 rounded-xl">
              Become a member
            </button>
          </div>
        </div>

        {/* Members */}
        <div className="p-6">
          <h1 className="font-koulen text-4xl text-grey mb-2">Members</h1>
          <h2 className="text-lg text-grey font-bold">State Level Leaders</h2>
          <div className="p-6 flex justify-evenly items-center my-2">
            <img src="/user.svg" alt="user profile" height={60} width={60} />
            <div>
              <h1 className="font-medium text-2xl">Name</h1>
              <h2 className="text-lg">Position</h2>
              <p className="text-grey text-sm">+91 99*** *****</p>
            </div>
          </div>
          <div className="flex justify-center items-center w-fit bg-kaavi text-white mx-auto py-2 px-4 rounded-xl">
            <Link href="#">All members</Link>
            <IoIosArrowDown className="ml-1" />
          </div>
        </div>

        {/* Offers and rewards */}
        <div className="p-6">
          <h1 className="font-koulen text-4xl text-grey mb-2">
            Offers and rewards
          </h1>
          <div className="flex justify-between items-center mt-6 ml-5">
            <div className="bg-[#FBE9E9] rounded-full p-4">
              <img src="/games.svg" alt="games" width={40} height={40} />
            </div>
            <div></div>
            <div className="bg-[#FBE9E9] mr-5 rounded-full p-4">
              <img src="/offers.svg" alt="offers" width={40} height={40} />
            </div>
            <div className="bg-[#FBE9E9] mr-6 rounded-full p-4">
              <img
                src="/referrals.svg"
                alt="referrals"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div className="flex justify-around items-center mt-1">
            <h2>Games</h2>
            <h2>Offers</h2>
            <h2>Referrals</h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
