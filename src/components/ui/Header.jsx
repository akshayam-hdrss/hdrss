"use client";
import React, { useState, useEffect } from "react";
import { PiFlowerLotus } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";
import { IoToggle } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IoClose } from "react-icons/io5";
import auth from "@/firebase/config.js";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import { getUser } from "@/firebase/firestore/user";
import { useRouter } from "next/navigation";
const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "80%",
          padding: "20px 40px", // Set fixed width for the drawer
        },
      },
    },
  },
});

function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [userDoc, setUserDoc] = useState();
  const router = useRouter();
  const toggleDrawer = () => setOpen(!open);
  const handleLogout = () => {
    auth.signOut();
    router.push("/login");
  };
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
    <div
      className="w-full px-4 py-4 text-primary flex flex-row justify-between items-center"
      style={{
        background: "linear-gradient(to right, #FF4D14 0%, #FF1F00 100%)",
      }}
    >
      <Link href="/" className="mr-28">
<h1 className="font-lena font-medium text-2xl">akshayam</h1>
      </Link>

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

            {user ? (
              <div className="flex flex-col mb-14 mt-2 justify-evenly items-center">
                <p className="mt-10 text-2xl my-1 font-bold">Welcome,</p>
                <p className="my-1 mb-4 text-lg font-bold border-b-2 border-b-kaavi">
                  {userDoc && userDoc.name}
                </p>
                <button
                  onClick={handleLogout}
                  className="bg-kaavi text-white p-3 rounded-xl"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-row mb-14 mt-8 font-medium justify-evenly items-center">
                <Link
                  href={"/login"}
                  className="p-3 border border-black rounded-xl"
                >
                  Login
                </Link>
                <Link
                  href={"/signup"}
                  className="p-3 bg-kaavi text-white rounded-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}

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
          </Drawer>
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
}

export default Header;
