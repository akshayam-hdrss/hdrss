import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import Link from "next/link";

function SelectLocation() {
  const districts = ["Chennai", "Madurai", "Tiruppur", "Salem"];
  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <Link href="/">
          <IoIosArrowDown fontSize={30} />
        </Link>
        <h1 className="text-xl ml-3 font-bold">Select District</h1>
      </div>
      <div className="flex bg-white rounded-xl items-center shadow-[100px_100px_80px_rgba(0,0,0,0.08)] p-3">
        <IoSearch fontSize={25} className="text-kaavi" />
        <input
          type="text"
          placeholder="Search for your city"
          className="bg-inherit ml-5 text-lg"
        />
      </div>
      <div className="p-6">
        {districts.map((district, index) => (
          <div className="flex items-center my-4" key={index}>
            <GrLocation className="m-3" fontSize={25} />
            <p className="ml-2 text-xl font-medium">{district}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectLocation;
