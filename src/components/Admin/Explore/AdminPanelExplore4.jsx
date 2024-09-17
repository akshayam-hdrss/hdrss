"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BackButton from "@/components/ui/BackButton";
import { addExplore, addLibraryBook } from "@/firebase/firestore/explore";
import { addAstrology } from "@/firebase/firestore/explore";
import EditExplore4 from "@/components/Admin/Explore/EditExplore4";
import { getServiceAndProductDocs } from "@/firebase/firestore/servicesProducts";
import { addOtherExplore } from "../../../firebase/firestore/explore";

function AdminPanelExplore4() {
  const [open, setOpen] = useState();
  const [data, setData] = useState();
  const [backgroundPhoto, setBackgroundPhoto] = useState();
  const [photo, setPhoto] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  const [fullDescription, setFullDescription] = useState();
  const [video, setVideo] = useState();
  const searchparam = useSearchParams();
  const tempprevious = searchparam.get("previous");
  const previous = decodeURIComponent(tempprevious);
  const beforeprevious = searchparam.get("beforeprevious");
  const rootprevious = searchparam.get("rootprevious");
  const type = searchparam.get("type");
  const previousname = searchparam.get("name");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExplore(
      rootprevious,
      beforeprevious,
      previous,
      backgroundPhoto,
      photo,
      name,
      description,
      fullDescription,
      video
    );
    setBackgroundPhoto(null);
    setName("");
    setPhoto(null);
    setDescription("");
    setVideo("");
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getServiceAndProductDocs(
        rootprevious,
        beforeprevious,
        previous,
        null,
        "explore"
      );
      setData(data);
    };
    fetch();
  });
  return (
    <>
      <BackButton />
      <div className="p-10 overflow-y-scroll">
        <h1 className="text-3xl font-bold pb-20">{previousname}</h1>

        <div>
          <EditExplore4
            data={data}
            open={open}
            setOpen={setOpen}
            rootprevious={rootprevious}
            beforeprevious={beforeprevious}
            previous={previous}
          />
        </div>
        <div className="flex flex-col gap-y-10">
          <div>
            <p className="mb-4 text-xl font-medium">Enter the Title</p>
            <input
              type="text"
              placeholder="Title"
              className="border border-kaavi py-2 w-fit pr-4 pl-1 rounded-md"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-4 text-xl font-medium">Enter the Preview Photo</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          <div>
            <p className="mb-4 text-xl font-medium">
              Enter the Background Photo
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBackgroundPhoto(e.target.files[0])}
            />
          </div>
          <div>
            <p className="mb-4 text-xl font-medium">Enter the Description</p>
            <textarea
              rows={5}
              cols={60}
              placeholder="Description"
              className="border border-kaavi py-2 w-fit pr-4 pl-1 rounded-md"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-4 text-xl font-medium">Enter the Full Description</p>
            <textarea
              rows={5}
              cols={60}
              placeholder="Full Description"
              className="border border-kaavi py-2 w-fit pr-4 pl-1 rounded-md"
              onChange={(e) => setFullDescription(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-4 text-xl font-medium">Enter the Video Link</p>
            <input
              type="text"
              placeholder="Youtube link"
              className="border border-kaavi py-2 w-fit pr-4 pl-1 rounded-md"
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>

          <button
            className="bg-kaavi text-white px-4 py-2 rounded-lg w-fit"
            onClick={handleSubmit}
          >
            Submit Data
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminPanelExplore4;
