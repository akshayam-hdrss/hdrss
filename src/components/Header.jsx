"use client";
import React from "react";
import { PiFlowerLotus } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";
import { IoToggle } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Link from "next/link";

function Header() {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div
      className="w-full px-4 py-4 text-primary flex flex-row justify-between items-center"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #FF9243 100%, #FF3E01 0%)",
      }}
    >
      <Link href="/">
        <PiFlowerLotus fontSize={40} className="cursor-pointer" />
      </Link>
      <div className="font-bold uppercase text-xs">
        <h1>Hindu Dharma Raksha Sena</h1>
        <h1>हिंदू धर्म रक्षा सेना</h1>
        <h1>இந்து தர்ம ரக்ஷ சேனா</h1>
      </div>

      <IoToggle fontSize={35} className="cursor-pointer" />
      <React.Fragment>
        <Button onClick={openDrawer} className="bg-inherit m-0 p-0 shadow-none">
          <IoMenu fontSize={40} />
        </Button>
        <Drawer
          open={open}
          onClose={closeDrawer}
          placement="right"
          className="p-4"
        >
          <div className="mb-6 flex items-center justify-between">
           
            <IconButton
              variant="text"
              className="ml-auto"
              color="blue-gray"
              onClick={closeDrawer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <Typography
            color="black"
            component={"div"}
            className="mb-8 flex flex-col justify-evenly items-center font-normal"
          >
            <FaRegUserCircle fontSize={50} />
            <a className="my-1 mb-4 font-bold">User Name</a>
            <Button size="lg" className="bg-kaavi">
              View Profile
            </Button>
          </Typography>
          <div>
            <Typography
              component={"div"}
              className="px-4 py-2 font-inter"
              color="black"
            >
              <Link href="/" className="flex mb-4 items-center justify-between">
                <a className="font-medium">Home</a>
                <IoIosArrowForward />
              </Link>
              <div className="flex mb-4 items-center justify-between">
                <p className="font-medium">Select Location</p>
                <IoIosArrowForward />
              </div>
              <Link
                href="/all-services"
                className="flex mb-4 items-center justify-between"
              >
                <a className="font-medium">Explore Services</a>
                <IoIosArrowForward />
              </Link>
              <Link
                href="/directory"
                className="flex mb-4 items-center justify-between"
              >
                <a className="font-medium">Telephone Directory</a>
                <IoIosArrowForward />
              </Link>
              <div className="flex items-center justify-between">
                <a className="font-medium">Contact Us</a>
                <IoIosArrowForward />
              </div>
              <Link href="/admin" className="flex items-center justify-between">
                <a className="font-medium">Admin Panel</a>
                <IoIosArrowForward />
              </Link>
            </Typography>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default Header;
