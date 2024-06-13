"use client";
import React from "react";
import { useState, useEffect } from "react";
import auth from "@/firebase/config";
import ServiceCard from "./ServiceCard";
import AddServicePopup from "@/components/AddServicePopup";
import {
  getServicesList,
  subscribeToProducts,
  subscribeToServices,
} from "@/firebase/firestore/getData";
import EditServicePopup from "./EditServicePopup";
import DeleteServicePopup from "./DeleteServicePopup";
import Link from "next/link";
import EditExplorePopup from "./EditExplorePopup";
import DeleteExplorePopup from "./DeleteExplorePopup";
import AddExplorePopup from "./AddExplorePopup";
import { subscribeToExplore } from "../firebase/firestore/getExplore";
function AdminPanel() {
  const [addOpen, setAddOpen] = useState(false);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editProductsOpen, setEditProductsOpen] = useState(false);
  const [deleteProductOpen, setDeleteProductOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [services, setServices] = useState(null);
  const [products, setProducts] = useState(null);
  const [explore, setExplore] = useState();
  const [exploreAdd, setExploreAdd] = useState();
  const [editExploreOpen, setEditExploreOpen] = useState();
  const [deleteExploreOpen, setDeleteExploreOpen] = useState();
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
    const unsubscribe3 = subscribeToExplore(setExplore);
    const items = getServicesList();
    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
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
            open={addServiceOpen}
            setOpen={setAddServiceOpen}
            beforeprevious={null}
            previous={null}
            type="services"
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
              open={deleteProductOpen}
              setOpen={setDeleteProductOpen}
              data={products}
              rootprevious={null}
              beforeprevious={null}
              previous={null}
              type="products"
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
            beforeprevious={null}
            previous={null}
            type="products"
          />
        </div>
        <div className="my-20">
          <Link
            className="font-bold underline text-2xl active:text-kaavi"
            href={"/admin/leaders"}
          >
            Add Leaders
          </Link>
        </div>
        <div className="my-4">
          <h1 className="font-bold text-2xl md:text-4xl inline">Explore</h1>
          <div className=" flex gap-x-10">
            <EditExplorePopup
              open={editExploreOpen}
              setOpen={setEditExploreOpen}
              data={explore}
              rootprevious={null}
              beforeprevious={null}
              previous={null}
            />
            <DeleteExplorePopup
              open={deleteExploreOpen}
              setOpen={setDeleteExploreOpen}
              data={explore}
              rootprevious={null}
              beforeprevious={null}
              previous={null}
            />
          </div>
          <div className="grid grid-cols-3 place-items-center md:grid-cols-4 mt-10 gap-y-10 gap-x-10">
            {explore &&
              explore.map((item) => (
                <ServiceCard
                  name={item.name}
                  url={item.iconUrl}
                  slug={`/admin/level2?previous=${item.id}&type=explore`}
                />
              ))}
            <AddExplorePopup
              open={exploreAdd}
              setOpen={setExploreAdd}
              beforeprevious={null}
              previous={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
