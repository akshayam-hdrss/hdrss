"use client";
import React, { useEffect, useState } from "react";
import AddCharity from "@/components/Admin/Charities/AddCharity";
import { getCharities } from "@/firebase/firestore/charity";
import EditCharity from "@/components/Admin/Charities/EditCharity";
import DeleteCharity from "@/components/Admin/Charities/DeleteCharity";

function charitiesPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [data, setData] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const res = await getCharities();
      setData(res);
    };
    fetch();
  }, []);
  return (
    <div className="p-6">
      <h1 className="font-bold text-4xl">Charities</h1>
      <div>
        <AddCharity open={addOpen} setOpen={setAddOpen} />
      </div>
      {data &&
        data.map((doc, index) => (
          <div key={index} className="grid grid-cols-2 gap-5">
            <div className="">
              <img
                src={doc.data.profile}
                alt=""
                className="m-auto min-w-[150px]"
              />
            </div>
            <div className="grid">
              <h1 className="font-semibold text-xl">{doc.data.name}</h1>
              <h3 className="h-[50px] overflow-hidden">
                {doc.data.description}
              </h3>
              <div className="w-full flex justify-evenly items-center">
                <EditCharity
                  open={editOpen}
                  setOpen={setEditOpen}
                  id={doc.id}
                />
                <DeleteCharity
                  open={deleteOpen}
                  setOpen={setDeleteOpen}
                  id={doc.id}
                  name={doc.data.name}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default charitiesPage;
