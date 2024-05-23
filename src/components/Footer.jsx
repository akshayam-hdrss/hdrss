import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { PiFlowerLotus } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
function Footer() {
  return (
    <div className="bg-kaavi text-primary px-4 py-10 pb-4">
      <div className="flex mb-10 items-center">
        <Link href="/ramdass">
          <img src="/ramdass.png" alt="Ram Dass" width={80} height={80} />
        </Link>
        <div className="ml-3">
          <h1 className="font-bold text-xl leading-6 mb-1">
            Sandilyan <br />
            Rama Dass
          </h1>
          <h2 className="text-sm">HDRSS Founder</h2>
        </div>
        <Image src="/hdrss.png" alt="logo" width={60} height={60} className="ml-16" />
      </div>
      <div className="flex flex-col justify-center items-start">
        <h2 className="text-2xl font-bold pb-2">Resources</h2>
        <a className="text-base/7" href="">
          Photo Gallery
        </a>
        <a className="text-base/7" href="">
          News and Events
        </a>
        <a className="text-base/7" href="">
          List your Services
        </a>
        <a className="text-base/7" href="">
          To advertise
        </a>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold pb-2 pt-8">Address</h2>
        <p className="text-base/7">
          No: 13, Bhairavai 2nd Street,
          <br /> Edayarpalayam,
          <br /> Coimbatore - 641 025
        </p>
        <div className="flex text-base/7 flex-col justify-center items-center pt-20">
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
