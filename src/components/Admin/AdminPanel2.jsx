"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ServiceCard from "@/components/ui/ServiceCard";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import BackButton from "@/components/ui/BackButton";
import AddServicePopup from "@/components/Admin/Services/AddServicePopup";
import EditServicePopup from "@/components/Admin/Services/EditServicePopup";
import DeleteServicePopup from "@/components/Admin/Services/DeleteServicePopup";
import EditExplorePopup from "@/components/Admin/Explore/EditExplorePopup";
import DeleteExplorePopup from "@/components/Admin/Explore/DeleteExplorePopup";
import AddExplorePopup from "@/components/Admin/Explore/AddExplorePopup";
import { subscribeToExplore } from "@/firebase/firestore/explore";
import Ads from "./Advertisements/Ads";
import { getLevel2ServiceAds } from "@/firebase/firestore/advertisements";
import EditSno from "./Services/EditSno";
import Link from "next/link";
import EditYt from "./Services/EditYt";
function AdminPanel2() {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(null);
  const [products, setProducts] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [adsOpen, setAdsOpen] = useState(false);
  const [explore, setExplore] = useState();
  const [exploreAdd, setExploreAdd] = useState();
  const [editExploreOpen, setEditExploreOpen] = useState();
  const [deleteExploreOpen, setDeleteExploreOpen] = useState();
  const [ytOpen, setYtOpen] = useState();
  const [ads, setAds] = useState();
  const [snoOpen, setSnoOpen] = useState();
  const searchparam = useSearchParams();
  const previous = searchparam.get("previous");
  const type = searchparam.get("type");
  const content1 =
    services &&
    services.map((item, index) => (
      <Link
        href={`/admin/level3?previous=${encodeURIComponent(
          item.id
        )}&beforeprevious=${previous}&type=services&name=${encodeURIComponent(
          item.name
        )}`}
        key={index}
        className="flex items-center md:gap-x-6 justify-center bg-[#F4F5F5] rounded-xl h-20 md:h-28 p-6 px-3"
      >
        <div className="w-1/3 md:w-1/5 h-fit mr-3">
          <img
            src={item.iconUrl}
            alt="Icon"
            className="object-scale-down aspect-square"
          />
        </div>
        <h1 className="w-2/3 md:w-4/5 md:text-xl md:font-medium mr-0">
          {item.name}
        </h1>
      </Link>
    ));
  const content2 =
    products &&
    products.map((item, index) => (
      <Link
        href={`/admin/level3?previous=${
          item.id
        }&beforeprevious=${previous}&type=products&name=${encodeURIComponent(
          item.name
        )}`}
        key={index}
        className="flex items-center md:gap-x-6 justify-center bg-[#F4F5F5] rounded-xl h-20 md:h-28 p-6 px-3"
      >
        <div className="w-1/3 md:w-1/5 h-fit mr-3">
          <img
            src={item.iconUrl}
            alt="Icon"
            className="object-scale-down aspect-square"
          />
        </div>
        <h1 className="w-2/3 md:w-4/5 md:text-xl md:font-medium mr-0">
          {item.name}
        </h1>
      </Link>
    ));
  const content3 =
    explore &&
    explore.map((item) => (
      <Link
        href={`/admin/level3?previous=${
          item.id
        }&beforeprevious=${previous}&type=explore&name=${encodeURIComponent(
          item.name
        )}`}
        key={index}
        className="flex items-center md:gap-x-6 justify-center bg-[#F4F5F5] rounded-xl h-20 md:h-28 p-6 px-3"
      >
        <div className="w-1/3 md:w-1/5 h-fit mr-3">
          <img
            src={item.iconUrl}
            alt="Icon"
            className="object-scale-down aspect-square"
          />
        </div>
        <h1 className="w-2/3 md:w-4/5 md:text-xl md:font-medium mr-0">
          {item.name}
        </h1>
      </Link>
    ));
  useEffect(() => {
    const unsubscribe1 = subscribeToServicesAndProducts(
      setServices,
      previous,
      null,
      "services"
    );
    const unsubscribe2 = subscribeToServicesAndProducts(
      setProducts,
      previous,
      null,
      "products"
    );
    const unsubscribe3 = subscribeToExplore(setExplore, previous);
    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
    };
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const data = await getLevel2ServiceAds(previous, type);
      setAds(data);
    };
    fetch();
  }, [adsOpen]);
  return (
    <div className="p-10">
      <BackButton route="/admin" />
      <div className="flex justify-between items-center mb-14">
        <h1 className=" font-bold text-2xl md:text-4xl mr-10">
          {previous.charAt(0).toUpperCase() + previous.slice(1)}
        </h1>
        <div className="flex gap-x-10">
          {type === "explore" ? (
            <>
              <EditExplorePopup
                open={editExploreOpen}
                setOpen={setEditExploreOpen}
                data={explore}
                rootprevious={null}
                beforeprevious={null}
                previous={previous}
              />
              <DeleteExplorePopup
                open={deleteExploreOpen}
                setOpen={setDeleteExploreOpen}
                data={explore}
                rootprevious={null}
                beforeprevious={null}
                previous={previous}
              />
            </>
          ) : (
            <>
              <EditSno
                beforeprevious={null}
                previous={previous}
                open={snoOpen}
                setOpen={setSnoOpen}
                type={type}
              />
              <EditServicePopup
                open={editOpen}
                setOpen={setEditOpen}
                data={services}
                rootprevious={null}
                beforeprevious={null}
                previous={previous}
                type={type}
              />
              <DeleteServicePopup
                open={deleteOpen}
                setOpen={setDeleteOpen}
                data={services}
                rootprevious={null}
                beforeprevious={null}
                previous={previous}
                type={type}
              />
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-10 gap-x-14 items-center justify-center py-6 px-10">
        {type == "services" ? content1 : content2}
        {type == "explore" && content3}
        {type == "explore" ? (
          <>
            <AddExplorePopup
              open={exploreAdd}
              setOpen={setExploreAdd}
              beforeprevious={null}
              previous={previous}
            />
          </>
        ) : (
          <>
            <AddServicePopup
              open={open}
              setOpen={setOpen}
              rootprevious={null}
              beforeprevious={null}
              previous={previous}
              type={type}
            />
          </>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h1>Advertisements</h1>
          <Ads
            open={adsOpen}
            setOpen={setAdsOpen}
            rootprevious={null}
            beforeprevious={null}
            previous={previous}
            type={type}
            data={ads}
          />
        </div>
        <div className="flex justify-between items-center my-4">
          <h1>Youtube Link</h1>
          <EditYt
            open={ytOpen}
            setOpen={setYtOpen}
            type={type}
            previous={previous}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel2;
