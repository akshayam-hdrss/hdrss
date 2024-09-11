"use client";
import React, { use, useState } from "react";
import { useSearchParams } from "next/navigation";
import BackButton from "@/components/ui/BackButton";
import { addLibraryBook } from "@/firebase/firestore/explore";
import { addAstrology } from "../../../firebase/firestore/explore";

function AdminPanelExplore4() {
  const [book, setBook] = useState();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState();
  const [astrologyDate, setAstrologyDate] = useState();
  const [astrologyDescription, setAstrologyDescription] = useState();
  const [astrologyVideo, setAstrologyVideo] = useState();
  const searchparam = useSearchParams();
  const tempprevious = searchparam.get("previous");
  const previous = decodeURIComponent(tempprevious);
  const beforeprevious = searchparam.get("beforeprevious");
  const rootprevious = searchparam.get("rootprevious");
  const type = searchparam.get("type");
  const previousname = searchparam.get("name");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rootprevious == "library" || rootprevious == "history") {
      await addLibraryBook(
        rootprevious,
        beforeprevious,
        previous,
        book,
        name,
        photo
      );
    } else if (rootprevious == "astrology") {
      await addAstrology(
        rootprevious,
        beforeprevious,
        previous,
        astrologyDate,
        astrologyDescription,
        astrologyVideo
      );
    }
    setBook(null);
    setName("");
    setPhoto(null);
    setAstrologyDate("");
    setAstrologyDescription("");
    setAstrologyVideo("");
  };
  return (
    <>
      <BackButton />
      <div className="p-10 overflow-y-scroll">
        <h1 className="text-3xl font-bold pb-20">{previousname}</h1>
        {rootprevious == "library" || rootprevious == "history" ? (
          <div className="flex flex-col gap-y-10">
            <div>
              <p className="mb-4 text-xl font-medium">
                Enter the PDF file of the book
              </p>
              <input type="file" onChange={(e) => setBook(e.target.files[0])} />
            </div>
            <div>
              <p className="mb-4 text-xl font-medium">
                Enter the name of the book
              </p>
              <input
                type="text"
                placeholder="Name of the book"
                className="border border-kaavi py-2 w-fit pr-4 pl-1 rounded-md"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-4 text-xl font-medium">
                Enter the Preview Photo of the book
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>

            <button
              className="bg-kaavi text-white px-4 py-2 rounded-lg w-fit"
              onClick={handleSubmit}
            >
              Upload book
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-y-10">
            <div>
              <p className="mb-4 text-xl font-medium">
                Enter the date of the Astrology
              </p>
              <input
                type="date"
                placeholder="Date of the Astrology"
                className="border border-kaavi py-2 w-fit pr-4 pl-1 rounded-md"
                onChange={(e) => setAstrologyDate(e.target.value)}
              />
            </div>

            <div>
              <p className="mb-4 text-xl font-medium">Enter the Description</p>
              <textarea
                rows={5}
                cols={60}
                placeholder="Astrology for the sign"
                className="border border-kaavi py-2 w-fit pr-4 pl-1 rounded-md"
                onChange={(e) => setAstrologyDescription(e.target.value)}
              />
            </div>

            <div>
              <p className="mb-4 text-xl font-medium">
                Enter the Video Link (if any)
              </p>
              <input
                type="text"
                placeholder="Youtube link"
                className="border border-kaavi py-2 w-fit pr-4 pl-1 rounded-md"
                onChange={(e) => setAstrologyVideo(e.target.value)}
              />
            </div>

            <button
              className="bg-kaavi text-white px-4 py-2 rounded-lg w-fit"
              onClick={handleSubmit}
            >
              Upload Astrology
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminPanelExplore4;
