"use client";
import React from "react";
import { PiFlowerLotus } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";
import { IoToggle } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IoClose } from "react-icons/io5";

import Link from "next/link";
import Image from "next/image";
const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "80%",
          padding: "20px 40px"// Set fixed width for the drawer
        },
      },
    },
  },
});

function Header() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <div
      className="w-full px-4 py-4 text-primary flex flex-row justify-between items-center"
      style={{
        background: "linear-gradient(to right, #FF4D14 0%, #FF1F00 100%)",
      }}
    >
      <Link href="/">
        <Image src="/hdrss.png" alt="logo" width={40} height={40} />
      </Link>
      <div className="font-bold uppercase text-center text-xs">
        <h1>Hindu Dharma Raksha Sena</h1>
        <h1>हिंदू धर्म रक्षा सेना</h1>
        <h1>இந்து தர்ம ரக்ஷ சேனா</h1>
      </div>

      <IoToggle fontSize={35} className="cursor-pointer" />
      <React.Fragment>
        <button
          onClick={toggleDrawer}
          className="bg-inherit m-0 p-0 shadow-none"
        >
          <IoMenu fontSize={40} />
        </button>
        <ThemeProvider theme={theme}>
          <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer}
            sx={{
              width: "45%",
            }}
          >
            <IoClose className="ml-auto" fontSize={30} onClick={toggleDrawer} />

            <div className="flex flex-col mb-14 mt-2 justify-evenly items-center">
              <FaRegUserCircle fontSize={50} />
              <a className="my-1 mb-4 font-bold">User Name</a>
              <Link
                href="#"
                className="bg-kaavi text-white rounded-xl py-3 px-4 text-center w-fit"
              >
                View Profile
              </Link>
            </div>
            <Link href="/" className="flex mb-4 items-center justify-between">
              <p className="font-medium">Home</p>
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
              <p className="font-medium">Explore Services</p>
              <IoIosArrowForward />
            </Link>
            <Link
              href="/directory"
              className="flex mb-4 items-center justify-between"
            >
              <p className="font-medium">Telephone Directory</p>
              <IoIosArrowForward />
            </Link>
            <div className="flex mb-4 items-center justify-between">
              <a className="font-medium">Contact Us</a>
              <IoIosArrowForward />
            </div>
            <Link
              href="/admin"
              className="flex items-center mb-4 justify-between"
            >
              <p className="font-medium">Admin Panel</p>
              <IoIosArrowForward />
            </Link>
          </Drawer>
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
}

export default Header;
