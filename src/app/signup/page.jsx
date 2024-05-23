import React from "react";
import { PiFlowerLotus } from "react-icons/pi";
import Image from "next/image";
import BackButton from "@/components/BackButton";

const Signup = () => {
  return (
    <div className="p-10 overflow-hidden">
      <PiFlowerLotus fontSize={80} className="mx-auto mb-10 mt-5" />
      <BackButton route="/" />
      <div className="py-6 px-4 z-10 relative">
        <h1 className="font-bold uppercase text-3xl mb-12">Sign up</h1>
        <Image
          src="/om.svg"
          alt="om"
          width={300}
          height={300}
          className="rotate-45 opacity-5 absolute top-12 -z-10 right-1"
        />
        <form action="">
          <div className="flex justify-center items-center mb-8 border-b border-black pb-2">
            <Image
              src="/user1.svg"
              alt="user"
              width={100}
              height={100}
              className="ml-14"
            />
            <input
              type="text"
              placeholder="Name"
              className="bg-inherit font-bold ml-5 inline"
            />
          </div>
          <div className="flex justify-center items-center mb-8 border-b border-black pb-2">
            <Image
              src="/mobile.svg"
              alt="user"
              width={100}
              height={100}
              className="ml-14"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="bg-inherit font-bold ml-5 inline"
            />
          </div>
          <div className="flex justify-center items-center mb-8 border-b border-black pb-2">
            <Image
              src="/password.svg"
              alt="user"
              width={100}
              height={100}
              className="ml-14"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-inherit font-bold ml-5 inline"
            />
          </div>
          <div className="flex justify-center items-center">
            <input type="checkbox" className="rounded-none" />
            <p className="text-sm ml-1">
              I agree to all the terms and conditions
            </p>
          </div>
          <div className="text-center">
            <button className="mt-5 p-3 bg-kaavi text-white rounded-xl w-full">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
