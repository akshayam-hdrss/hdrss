"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ServiceCard";
import {
  subscribeToProducts,
  subscribeToServices,
} from "@/firebase/firestore/getData";
import BackButton from "./BackButton";
import AddServicePopup from "@/components/AddServicePopup";
import EditServicePopup from "./EditServicePopup";
import DeleteServicePopup from "./DeleteServicePopup";

function AdminPanel2() {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(null);
  const [products, setProducts] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const searchparam = useSearchParams();
  const previous = searchparam.get("previous");

  useEffect(() => {
    const unsubscribe1 = () => subscribeToServices(setServices, previous);
    const unsubscribe2 = () => subscribeToProducts(setProducts, previous);
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);
  return (
    <div className="p-10">
      <BackButton route="/admin" />
      <div className="flex justify-between items-center mb-14">
        <h1 className="text-3xl font-bold pb-20">
          {previous.charAt(0).toUpperCase() + previous.slice(1)}
        </h1>
        <EditServicePopup
          open={editOpen}
          setOpen={setEditOpen}
          data={services}
          rootprevious={null}
          beforeprevious={null}
          previous={previous}
          name="services"
        />
        <DeleteServicePopup
          open={deleteOpen}
          setOpen={setDeleteOpen}
          data={services}
          rootprevious={null}
          beforeprevious={null}
          previous={previous}
          name="services"
        />
      </div>

      <div className="grid grid-cols-3 place-items-center gap-y-10 gap-x-10">
        {services &&
          services.map((item) => (
            <ServiceCard
              name={item.name}
              url={item.iconUrl}
              slug={`/admin/level3?previous=${item.id}&beforeprevious=${previous}`}
            />
          ))}
        <AddServicePopup
          open={open}
          setOpen={setOpen}
          rootprevious={null}
          beforeprevious={null}
          previous={previous}
        />
      </div>
      <div className="my-8 mt-14 md:mt-32">
        <h1 className="font-bold text-2xl md:text-4xl">Products</h1>
        <div className="gap-x-10 flex ">
          <EditServicePopup
            open={editOpen}
            setOpen={setEditOpen}
            data={products}
            rootprevious={null}
            beforeprevious={null}
            previous={previous}
            name="products"
          />
          <DeleteServicePopup
            open={deleteOpen}
            setOpen={setDeleteOpen}
            data={products}
            rootprevious={null}
            beforeprevious={null}
            previous={previous}
            name="products"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel2;
