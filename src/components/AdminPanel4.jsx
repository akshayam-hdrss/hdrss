"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AddServiceDocPopup from "./AddServiceDocPopup";
import BackButton from "./BackButton";
import {
  subscribeToProductsDocuments,
  subscribeToServiceDocuments,
} from "@/firebase/firestore/getData";
import AddProductDocPopup from "./AddProductDocPopup";
import DeleteDocPopup from "./DeleteDocPopup";
function AdminPanel4() {
  const [open, setOpen] = useState(false);
  const [productopen, setProductOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [services, setServices] = useState();
  const [products, setProducts] = useState();
  const searchparam = useSearchParams();
  const previous = searchparam.get("previous");
  const beforeprevious = searchparam.get("beforeprevious");
  const rootprevious = searchparam.get("rootprevious");
  const type = searchparam.get("type");
  const previousname = searchparam.get("name");
  const content1 =
    services &&
    services.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-evenly mt-20 border border-black p-3"
      >
        <img src={item.profilepicture} alt="profile picture" />
        <div>
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <p className="text-base text-grey">{item.location}</p>
          <p>{item.position}</p>
          <p>{item.mobile}</p>
        </div>
      </div>
    ));

  const content2 =
    products &&
    products.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-evenly mt-20 border border-black p-3"
      >
        <img src={item.profilepicture} alt="profile picture" />
        <div>
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <p>{item.price}</p>
        </div>
      </div>
    ));
  useEffect(() => {
    const unsubscribe1 = subscribeToServiceDocuments(
      setServices,
      previous,
      beforeprevious,
      rootprevious
    );
    const unsubscribe2 = subscribeToProductsDocuments(
      setProducts,
      previous,
      beforeprevious,
      rootprevious
    );
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  return (
    <>
      <BackButton
        route={`/admin/level3?previous=${beforeprevious}&beforeprevious=${rootprevious}&type=${type}`}
      />
      <div className="p-10">
        <h1 className="text-3xl font-bold pb-20">{previousname}</h1>
        <div>
          {type === "services" ? (
            <DeleteDocPopup
              open={deleteOpen}
              setOpen={setDeleteOpen}
              data={services}
              rootprevious={rootprevious}
              beforeprevious={beforeprevious}
              previous={previous}
              type="services"
            />
          ) : (
            <DeleteDocPopup
              open={deleteOpen}
              setOpen={setDeleteOpen}
              data={products}
              rootprevious={rootprevious}
              beforeprevious={beforeprevious}
              previous={previous}
              type="products"
            />
          )}
        </div>
        {type == "services" ? (
          <AddServiceDocPopup
            open={open}
            setOpen={setOpen}
            previous={previous}
            beforeprevious={beforeprevious}
            rootprevious={rootprevious}
            previousname={previousname}
          />
        ) : (
          <AddProductDocPopup
            open={productopen}
            setOpen={setProductOpen}
            previous={previous}
            beforeprevious={beforeprevious}
            rootprevious={rootprevious}
            previousname={previousname}
          />
        )}
        {type == "services" ? content1 : content2}
      </div>
    </>
  );
}

export default AdminPanel4;
