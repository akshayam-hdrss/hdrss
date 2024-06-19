"use client";
import React from "react";
import { useState, useEffect } from "react";
import auth from "@/firebase/config";
import ServiceCard from "../ui/ServiceCard";
import AddServicePopup from "@/components/Admin/Services/AddServicePopup";
import {
  getServicesList,
  subscribeToProducts,
  subscribeToServices,
} from "@/firebase/firestore/getData";
import EditServicePopup from "./Services/EditServicePopup";
import DeleteServicePopup from "./Services/DeleteServicePopup";
import Link from "next/link";
import EditExplorePopup from "./Explore/EditExplorePopup";
import DeleteExplorePopup from "./Explore/DeleteExplorePopup";
import AddExplorePopup from "./Explore/AddExplorePopup";
import { subscribeToExplore } from "../../firebase/firestore/getExplore";
import {
  uploadAdvertisements,
  uploadFilesAndSaveURLs,
} from "@/firebase/firestore/addData";
import { addRamadass, getRamadass } from "../../firebase/firestore/addData";

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

  const [leaderName, setLeaderName] = useState("");
  const [leaderAbout, setLeaderAbout] = useState("");
  const [leaderPhoto, setLeaderPhoto] = useState(null);
  const [leaderSocial, setLeaderSocial] = useState("");
  const [leaderMobile, setLeaderMobile] = useState(0);
  const [leaderEmail, setLeaderEmail] = useState("");
  const [exisitingLeader, setExistingLeader] = useState();
  const [photos, setPhotos] = useState([]);
  const handlePhotos = async (e) => {
    setPhotos([...e.target.files]);
  };
  const handleAds = async (e) => {
    e.preventDefault();
    const ads = await uploadFilesAndSaveURLs(photos);
    await uploadAdvertisements(ads);
    setPhotos([]);
  };

  const handleLeader = async (e) => {
    e.preventDefault();
    const data = {};
    data.name = leaderName == "" ? exisitingLeader.name : leaderName;
    data.about = leaderAbout == "" ? exisitingLeader.about : leaderAbout;
    data.social = leaderSocial == "" ? exisitingLeader.social : leaderSocial;
    data.email = leaderEmail == "" ? exisitingLeader.email : leaderEmail;
    data.mobile = leaderMobile == 0 ? exisitingLeader.mobile : leaderMobile;
    data.profile = exisitingLeader.profile;
    await addRamadass(data, leaderPhoto);
  };
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
    const fetchData = async () => {
      const data = await getRamadass();
      setExistingLeader(data);
    };
    const items = getServicesList();

    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
      fetchData();
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

        <div className="my-4 mt-20">
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
      <div className="my-20">
        <Link
          className="font-bold underline text-2xl active:text-kaavi"
          href={"/admin/leaders"}
        >
          Add Leaders
        </Link>
      </div>
      <div className="mt-20 mb-6">
        <h1 className="font-bold text-2xl">Home Page Advertisements</h1>
        <h2 className="font-bold text-lg mt-4">Give Images</h2>
        <input
          type="file"
          placeholder="Advertisements"
          onChange={handlePhotos}
          className="border mt-6 border-kaavi mb-6 w-60"
          accept="image/*"
          multiple
        />
        <button
          className="bg-kaavi text-white p-3 rounded-xl my-4"
          onClick={handleAds}
        >
          Add Advertisements
        </button>
      </div>
      <div className="flex flex-col justify-evenly items-start gap-y-4">
        <h1 className="font-bold text-2xl mb-4 mt-10">Edit Leader's Details</h1>

        <div>
          <p className="font-medium text-lg">Enter the Name</p>
          <input
            type="text"
            placeholder="Name of the Leader"
            className="border-2 border-kaavi py-1 pl-1 pr-5 rounded-md"
            defaultValue={exisitingLeader && exisitingLeader.name}
            onChange={(e) => setLeaderName(e.target.value)}
          />
        </div>
        <div>
          <p className="font-medium text-lg">Enter about</p>
          <textarea
            type="text"
            placeholder="About the Leader"
            className="border-2 border-kaavi py-1 pl-1 pr-5 rounded-md my-4"
            rows={4}
            cols={35}
            defaultValue={exisitingLeader && exisitingLeader.about}
            onChange={(e) => setLeaderAbout(e.target.value)}
          />
        </div>
        <div>
          <p className="font-medium text-lg">Enter the Youtube link</p>
          <input
            type="text"
            placeholder="Youtube video link"
            className="border-2 border-kaavi py-1 pl-1 pr-5 rounded-md"
            defaultValue={exisitingLeader && exisitingLeader.social}
            onChange={(e) => setLeaderSocial(e.target.value)}
          />
        </div>
        <div>
          <p className="font-medium text-lg">Enter the Email Address</p>
          <input
            type="text"
            placeholder="Email Address"
            className="border-2 border-kaavi py-1 pl-1 pr-5 rounded-md"
            defaultValue={exisitingLeader && exisitingLeader?.email}
            onChange={(e) => setLeaderEmail(e.target.value)}
          />
        </div>
        <div>
          <p className="font-medium text-lg">Enter the Mobile Number</p>
          <input
            type="text"
            placeholder="Mobile Number"
            className="border-2 border-kaavi py-1 pl-1 pr-5 rounded-md"
            defaultValue={exisitingLeader && exisitingLeader?.mobile}
            onChange={(e) => setLeaderMobile(e.target.value)}
          />
        </div>
        <div>
          <p className="font-medium text-lg">Give Profile Picture</p>
          <input
            type="file"
            className="border-2 border-kaavi py-1 pl-1 rounded-md"
            onChange={(e) => setLeaderPhoto(e.target.files[0])}
          />
        </div>

        <button
          onClick={handleLeader}
          className="bg-kaavi text-white p-3 rounded-xl my-6"
        >
          Update Details
        </button>
      </div>
      <div className="my-10">
        <h1 className="text-2xl font-bold mb-4">Events</h1>
        <Link
          className="font-bold bg-kaavi text-white p-3 rounded-xl"
          href={"/admin/events"}
        >
          Manage Events
        </Link>
      </div>
    </div>
  );
}

export default AdminPanel;
