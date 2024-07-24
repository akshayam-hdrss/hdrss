"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
function SideBar() {
  const path = usePathname();
  return (
    <div className="p-6 fixed flex justify-start items-center flex-col gap-y-6 w-[20vw] bg-[#F4F4F5] h-screen overflow-y-scroll overflow-x-hidden">
      <h1 className="font-lena my-4 text-2xl lg:text-4xl">akshayam</h1>
      <Link
        className={`font-medium w-fit px-4 py-2 rounded-lg lg:text-lg my-2 ${
          path === "/admin/" ? "bg-kaavi text-white" : " "
        }`}
        href={"/admin/"}
      >
        Dashboard
      </Link>

      <Link
        className={`font-medium w-fit px-4 py-2 rounded-lg lg:text-lg my-2 ${
          path.includes("services") ? "bg-kaavi text-white" : " "
        }`}
        href={"/admin/services"}
      >
        Services
      </Link>
      <Link
        className={`font-medium w-fit px-4 py-2 rounded-lg lg:text-lg my-2 ${
          path.includes("products") ? "bg-kaavi text-white" : " "
        }`}
        href={"/admin/products"}
      >
        Products
      </Link>
      <Link
        className={`font-medium w-fit px-4 py-2 rounded-lg lg:text-lg my-2 ${
          path.includes("explore") ? "bg-kaavi text-white" : " "
        }`}
        href={"/admin/explore"}
      >
        Explore
      </Link>
      <Link
        className={`font-medium w-fit px-4 py-2 rounded-lg lg:text-lg my-2 ${
          path.includes("events") ? "bg-kaavi text-white" : " "
        }`}
        href={"/admin/events"}
      >
        Events
      </Link>
      <Link
        className={`font-medium w-fit px-4 py-2 rounded-lg  lg:text-lg my-2 ${
          path.includes("news/") ? "bg-kaavi text-white" : " "
        }`}
        href={"/admin/news"}
      >
        News
      </Link>
      <Link
        className={`font-medium w-fit px-4 py-2 rounded-lg lg:text-lg my-2 ${
          path.includes("/admin/daily/") ? "bg-kaavi text-white" : " "
        }`}
        href={"/admin/daily"}
      >
        Day's special
      </Link>
      <Link
        className={`font-medium w-fit px-4 py-2 rounded-lg lg:text-lg  my-2 ${
          path.includes("/admin/leaders/") ? "bg-kaavi text-white" : " "
        }`}
        href={"/admin/leaders"}
      >
        Leaders
      </Link>
      <Link
        className={`font-medium w-fit px-4 py-2 rounded-lg lg:text-lg  my-2 ${
          path.includes("complaints") ? "bg-kaavi text-white" : " "
        }`}
        href={"/admin/complaints"}
      >
        Complaints
      </Link>
    </div>
  );
}

export default SideBar;
