"use client";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";
import ExploreCarousel from "@/components/ui/ExploreCarousel";
import Header from "@/components/ui/Header";
import Events from "@/components/Home/Events";
import Footer from "@/components/ui/Footer";
import { getUser } from "@/firebase/firestore/user";
import Level1Services from "@/components/ui/Level1Services";
import { getStateLeaders } from "@/firebase/firestore/leaders";
import { getHomeAdvertisements } from "@/firebase/firestore/advertisements";
import auth from "@/firebase/config.js";
import { onAuthStateChanged } from "firebase/auth";
import AdCarousel from "@/components/ui/AdCarousel";
import News from "@/components/Home/News";
import Products from "@/components/Home/Products";
import Daily from "@/components/Home/Daily";
export default function Home() {
  const [randomData, setRandomData] = useState();
  const [ads, setAds] = useState();
  const [user, setUser] = useState();
  const [userDoc, setUserDoc] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      const data = await getStateLeaders();
      const random = data[0];
      setRandomData(random);
      const data2 = await getHomeAdvertisements();
      setAds(data2);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const data = await getUser(currentUser.uid);
        setUserDoc(data);
      }
    });
    return unsubscribe;
  }, []);

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
            href="/district"
            className="bg-white z-10 absolute top-5 left-2 px-2 py-2 flex items-center justify-around rounded-3xl cursor-pointer shadow-md"
          >
            <MdLocationOn fontSize={28} className="pr-1 text-[#E53700]" />
            <p className="font-bold text-secondary">
              {userDoc ? userDoc.district : "District"}
            </p>
            <RiArrowDropDownLine fontSize={30} />
          </Link>

          <Link
            href="/location"
            className="bg-white z-10 absolute top-5 right-2 px-2 py-2 flex items-center justify-around rounded-3xl cursor-pointer shadow-md"
          >
            <MdLocationOn fontSize={28} className="pr-1 text-[#E53700]" />
            <p className="font-bold text-secondary">
              {userDoc ? userDoc.location : " Select Location"}
            </p>
            <RiArrowDropDownLine fontSize={30} />
          </Link>
          <Image
            src="/temple-bells.png"
            alt="temple-bells"
            width={150}
            height={150}
            className="opacity-30 absolute top-0 right-0 z-0"
          />
          <AdCarousel ads={ads} />

          <Image
            src="/ram-temple.png"
            alt="ram-temple"
            width={150}
            height={150}
            className="z-0 opacity-30 absolute left-0 bottom-0"
          />
        </div>

        {/* Services Section */}

        <div className="bg-[#FFFAF8] text-black relative w-full h-max pt-6 px-6 z-10 overflow-hidden rounded-[30px] -mt-10">
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

        {/* News Section */}
        <News />
        {/* Events Section */}
        <Events />
        {/* Products Section */}
        <div className="bgom overflow-hidden">
          <div className="p-6 relative ">
            <Image
              src="/om.svg"
              alt="om"
              width={300}
              height={300}
              className="rotate-45 opacity-[0.04] absolute right-7 -top-4 -z-10"
            ></Image>

            <h1 className="font-koulen text-4xl text-grey mb-6">Products</h1>
            <Products />
            <div className="flex flex-row justify-center items-center border-black border w-fit mx-auto mt-10 px-3 py-2 rounded-2xl cursor-pointer">
              <Link href="/products">See all products</Link>
              <IoIosArrowDown className="ml-1" />
            </div>
          </div>
        </div>

        <Daily />
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
          {randomData && (
            <div className="p-6 flex justify-evenly gap-x-4 items-center my-2">
              <img
                src={randomData.data.profile}
                alt="user profile"
                height={70}
                width={70}
              />
              <div>
                <h1 className="font-medium text-xl">{randomData.data.name}</h1>
                <h2 className="text-base">{randomData.data.position}</h2>
                <p className="text-grey text-sm">{randomData.data.mobile}</p>
              </div>
            </div>
          )}

          <div className="flex justify-center items-center w-fit bg-kaavi text-white mx-auto py-2 px-4 rounded-xl">
            <Link href="/members">All members</Link>
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
