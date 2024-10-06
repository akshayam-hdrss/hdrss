"use client";
import React, { useState, useEffect } from "react";
import AddOffer from "@/components/Admin/Offers/AddOffer";
import EditOffer from "@/components/Admin/Offers/EditOffer";
import DeleteOffer from "@/components/Admin/Offers/DeleteOffer";
import { getOffers } from "../../../firebase/firestore/offers";

function offersAdmin() {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [offers, setOffers] = useState();
  const [editId, setEditId] = useState();
  const [deleteId, setDeleteId] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getOffers();
      setOffers(data);
    };
    fetch();
  }, [addOpen]);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Offers</h1>
      <div className="flex justify-evenly my-6">
        <button
          className="bg-kaavi mx-2 text-white px-4 py-2 rounded-md"
          onClick={() => setAddOpen(true)}
        >
          Add
        </button>
        <EditOffer open={editOpen} setOpen={setEditOpen} id={editId} />
        <DeleteOffer open={deleteOpen} setOpen={setDeleteOpen} id={deleteId} />
      </div>
      {addOpen && <AddOffer open={addOpen} setOpen={setAddOpen} />}
      <div className="flex flex-col items-center text-center justify-evenly">
        {offers &&
          offers.map((doc, index) => (
            <div className="flex justify-center w-[400px]" key={index}>
              <div
                className="w-full h-40 bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(/coupon.png)` }}
              >
                <div className="grid grid-cols-2 h-full px-5 gap-5">
                  <div className="flex flex-col justify-center items-center h-full">
                    <img src={doc.photo} alt="" width={100} height={100}/>
                    <h1 className="font-serif text-4xl text-red-400">LUXNUT</h1>
                  </div>
                  <div className="flex justify-center items-center h-full">
                    <div className="">
                      <h1 className="font-semibold text-2xl">50% OFF</h1>
                      <h3>on orders above 2999</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default offersAdmin;
