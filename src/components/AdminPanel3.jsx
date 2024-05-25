"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AddServicePopup from "@/components/AddServicePopup";
import ServiceCard from "@/components/ServiceCard";
import { subscribeToServices } from "@/firebase/firestore/getData";
import EditServicePopup from "./EditServicePopup";
function AdminPanel3() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const searchparam = useSearchParams();
  const previous = searchparam.get("previous");
  const beforeprevious = searchparam.get("beforeprevious");

  useEffect(() => {
    const unsubscribe = subscribeToServices(setData, previous, beforeprevious);
    return () => unsubscribe();
  }, []);
  return (
    <div className="p-10">
      <div>
        <h1 className="text-3xl font-bold pb-20">
          {previous.charAt(0).toUpperCase() + previous.slice(1)}
        </h1>
        <EditServicePopup
          open={editOpen}
          setOpen={setEditOpen}
          data={data}
          rootprevious={null}
          beforeprevious={beforeprevious}
          previous={previous}
        />
      </div>

      <div className="grid grid-cols-3 place-items-center gap-y-10 gap-x-10">
        {data &&
          data.map((item) => (
            <ServiceCard
              name={item.name}
              url={item.iconUrl}
              slug={`/admin/level4?previous=${item.id}&beforeprevious=${previous}&rootprevious=${beforeprevious}`}
            />
          ))}
        <AddServicePopup
          open={open}
          setOpen={setOpen}
          rootprevious={null}
          beforeprevious={beforeprevious}
          previous={previous}
        />
      </div>
    </div>
  );
}

export default AdminPanel3;
