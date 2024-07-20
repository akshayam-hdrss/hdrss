"use client";
import React from "react";
import RamaDass from "./RamaDass";
import { useState } from "react";
import Ads from "@/components/Admin/Advertisements/Ads";
function AdminDashboard() {
  const [adsOpen, setAdsOpen] = useState();
  return (
    <div className="px-6 py-10">
      <h1 className="text-4xl font-bold mb-20">Hello, Admin</h1>

      <h2 className="font-bold text-2xl mb-4">About You</h2>
      <RamaDass />
      <h2 className="font-bold text-2xl mt-10 mb-4">Home Page Ads</h2>
      <Ads open={adsOpen} setOpen={setAdsOpen} home={true} />
    </div>
  );
}

export default AdminDashboard;
