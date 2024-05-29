"use client";
import React from "react";
import { useState, useEffect } from "react";
import auth from "@/firebase/config";
import ServiceCard from "./ServiceCard";
import AddServicePopup from "@/components/AddServicePopup";
import {
  subscribeToProducts,
  subscribeToServices,
} from "@/firebase/firestore/getData";
import EditServicePopup from "./EditServicePopup";
import DeleteServicePopup from "./DeleteServicePopup";

function AdminPanel() {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editProductsOpen, setEditProductsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [services, setServices] = useState(null);
  const [products, setProducts] = useState(null);
  const handleSignOut = () => {
    try {
      auth.signOut();
      window.location.replace("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe1 = subscribeToServices(setServices);
    const unsubscribe2 = subscribeToProducts(setProducts);
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  return (
    <div className="p-6 md:p-20 pt-12">
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
          <h1 className="font-bold text-2xl md:text-4xl">Services</h1>
          <div className="gap-x-10 flex ">
            <EditServicePopup
              open={editOpen}
              setOpen={setEditOpen}
              data={services}
              rootprevious={null}
              beforeprevious={null}
              previous={null}
              type="services"
            />
            <DeleteServicePopup
              open={deleteOpen}
              setOpen={setDeleteOpen}
              data={services}
              rootprevious={null}
              beforeprevious={null}
              previous={null}
              type="services"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 place-items-center md:grid-cols-4 mt-10 gap-y-10 gap-x-10">
          {services &&
            services.map((item) => (
              <ServiceCard
                name={item.name}
                url={item.iconUrl}
                slug={`/admin/level2?previous=${item.id}&type=services`}
              />
            ))}
          <AddServicePopup
            open={addOpen}
            setOpen={setAddOpen}
            rootprevious={null}
            beforeprevious={null}
            previous={null}
            item="services"
          />
        </div>
      </div>
      <div className="my-8 mt-14 md:mt-32">
        <div className="flex justify-between items-center mb-14">
          <h1 className="font-bold text-2xl md:text-4xl">Products</h1>
          <div className=" flex gap-x-10">
            <EditServicePopup
              open={editProductsOpen}
              setOpen={setEditProductsOpen}
              data={products}
              rootprevious={null}
              beforeprevious={null}
              previous={null}
              type="products"
            />
            <DeleteServicePopup
              open={deleteOpen}
              setOpen={setDeleteOpen}
              data={services}
              rootprevious={null}
              beforeprevious={null}
              previous={null}
              name="products"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 place-items-center md:grid-cols-4 mt-10 gap-y-10 gap-x-10">
          {products &&
            products.map((item) => (
              <ServiceCard
                name={item.name}
                url={item.iconUrl}
                slug={`/admin/level2?previous=${item.id}&type=products`}
              />
            ))}
          <AddServicePopup
            open={addOpen}
            setOpen={setAddOpen}
            rootprevious={null}
            beforeprevious={null}
            previous={null}
            type="products"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
