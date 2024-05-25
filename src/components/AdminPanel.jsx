"use client";
import React from "react";
import { useState, useEffect } from "react";
import auth from "@/firebase/config";
import ServiceCard from "./ServiceCard";
import AddServicePopup from "@/components/AddServicePopup";
import { subscribeToServices } from "@/firebase/firestore/getData";
import EditServicePopup from "./EditServicePopup";
import DeleteServicePopup from "./DeleteServicePopup";

function AdminPanel() {
  const [data, setData] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleSignOut = () => {
    try {
      auth.signOut();
      window.location.replace("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToServices(setData);
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 pt-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-koulen text-grey">admin panel</h1>
        <button
          onClick={handleSignOut}
          className="p-3 bg-kaavi text-white rounded-xl"
        >
          Sign Out
        </button>
      </div>
      <div className="my-8 mt-14">
        <div className="flex justify-between items-center mb-14">
          <h1 className="font-bold text-2xl">Services</h1>
          <EditServicePopup
            open={editOpen}
            setOpen={setEditOpen}
            data={data}
            rootprevious={null}
            beforeprevious={null}
            previous={null}
          />
          <DeleteServicePopup
            open={deleteOpen}
            setOpen={setDeleteOpen}
            data={data}
            rootprevious={null}
            beforeprevious={null}
            previous={null}
          />
        </div>

        <div className="grid grid-cols-3 place-items-center gap-y-10 gap-x-10">
          {data &&
            data.map((item) => (
              <ServiceCard
                name={item.name}
                url={item.iconUrl}
                slug={`/admin/level2?previous=${item.id}`}
              />
            ))}
          <AddServicePopup
            open={addOpen}
            setOpen={setAddOpen}
            rootprevious={null}
            beforeprevious={null}
            previous={null}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
