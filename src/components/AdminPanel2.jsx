"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";
import { subscribeToServices } from "@/firebase/firestore/getData";
import BackButton from "./BackButton";
import AddServicePopup from "@/components/AddServicePopup";

function AdminPanel2() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const searchparam = useSearchParams();
  const previous = searchparam.get("previous");

  useEffect(() => {
    const unsubscribe = () => subscribeToServices(setData, previous);
    return () => unsubscribe();
  }, []);
  return (
    <div className="p-10">
      <BackButton route="/admin" />
      <h1 className="text-3xl font-bold pb-20">
        {previous.charAt(0).toUpperCase() + previous.slice(1)}
      </h1>
      <div className="grid grid-cols-3 place-items-center gap-y-10 gap-x-10">
        {data &&
          data.map((item) => (
            <ServiceCard
              name={item.id}
              url={item.iconUrl}
              slug={`/admin/level3?previous=${item.id}&beforeprevious=${previous}`}
            />
          ))}
        <AddServicePopup open={open} setOpen={setOpen} rootprevious={null} beforeprevious={null} previous={previous} />
      </div>
    </div>
  );
}

export default AdminPanel2;
