"use client";
import React, { useEffect, useState } from "react";
import { addRamadass, getRamadass } from "@/firebase/firestore/ramadass";

function RamaDass() {
  const [leaderPhoto, setLeaderPhoto] = useState(null);
  const [leaderDetails, setLeaderDetails] = useState({});
  const [exisitingLeader, setExistingLeader] = useState();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setLeaderDetails({
      ...leaderDetails,
      [id]: value,
    });
  };

  const handleLeader = async (e) => {
    e.preventDefault();
    await addRamadass(leaderDetails, leaderPhoto);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRamadass();
      setExistingLeader(data);
    };
    fetchData();
  });

  return (
    <div className="flex flex-col justify-evenly items-start gap-y-4">
      <div>
        <p className="font-medium lg:text-lg">Enter the Name</p>
        <input
          type="text"
          placeholder="Name of the Leader"
          id="name"
          className="border-2 border-kaavi py-1 pl-1 pr-5 rounded-md"
          defaultValue={exisitingLeader && exisitingLeader.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="font-medium lg:text-lg">Enter about</p>
        <textarea
          type="text"
          placeholder="About the Leader"
          id="about"
          className="border-2 md:w-96 md:h-96 border-kaavi py-1 my-2 pl-1 pr-5 rounded-md"
          rows={4}
          cols={35}
          defaultValue={exisitingLeader && exisitingLeader.about}
          onChange={handleChange}
        />
      </div>
      <div>
        <p className="font-medium lg:text-lg">Enter the Youtube link</p>
        <input
          type="text"
          placeholder="Youtube video link"
          id="social"
          className="border-2 border-kaavi py-1 my-2 pl-1 pr-5 rounded-md"
          defaultValue={exisitingLeader && exisitingLeader.social}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-evenly gap-x-8">
        <div>
          <p className="font-medium lg:text-lg">Email Address</p>
          <input
            type="text"
            placeholder="Email Address"
            id="email"
            className="border-2 border-kaavi py-1 pl-1 pr-5 rounded-md"
            defaultValue={exisitingLeader && exisitingLeader?.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="font-medium lg:text-lg">Mobile Number</p>
          <input
            type="text"
            placeholder="Mobile Number"
            id="mobile"
            className="border-2 border-kaavi py-1 pl-1 pr-5 rounded-md"
            defaultValue={exisitingLeader && exisitingLeader?.mobile}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <p className="font-medium lg:text-lg">Give Profile Picture</p>
        <input
          type="file"
          className="border-2 border-kaavi py-1 pl-1 rounded-md"
          onChange={(e) => setLeaderPhoto(e.target.files[0])}
        />
      </div>

      <button
        onClick={handleLeader}
        className="bg-kaavi text-white px-4 py-2 rounded-md my-6"
      >
        Update Details
      </button>
    </div>
  );
}

export default RamaDass;
