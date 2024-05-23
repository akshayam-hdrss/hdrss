import React from "react";
import { PiFlowerLotus } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";

function Login() {
  return (
    <div className="p-10 overflow-hidden">
      <PiFlowerLotus fontSize={80} className="mx-auto mb-10 mt-5" />
      <Link href="/" className="flex items-center mb-6 font-bold">
        <IoIosArrowBack />
        <p>Back</p>
      </Link>
      <div className="py-6 px-4 z-10 relative">
        <h1 className="font-bold uppercase text-3xl mb-12">Log in</h1>
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
              placeholder="User Name"
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
          <p className="text-center">Or</p>
          <div className="flex items-center justify-between my-6">
            <Link href="#" className="border py-3 px-12 rounded-lg border-black">
              <FcGoogle fontSize={30} />
            </Link>
            <Link href="#" className="border py-3 px-12 rounded-lg bg-blue-800 text-white border-black">
              <FaFacebookF fontSize={30} />
            </Link>
          </div>
          <div className="text-center">
            <button className="mt-5 p-3 bg-kaavi text-white rounded-xl w-full">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
