"use client";
import React, { useState } from "react";
import { addServicesAndProductsDoc } from "@/firebase/firestore/servicesProducts";
import { Button, Dialog, DialogBody, Input } from "@material-tailwind/react";

function AddServiceDocPopup({
  open,
  setOpen,
  previous,
  beforeprevious,
  rootprevious,
  previousname,
}) {
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [businessName, setBusinessName] = useState();
  const [number, setNumber] = useState();
  const [about, setAbout] = useState();
  const [photos, setPhotos] = useState([]);
  const [addLine1, setAddLine1] = useState();
  const [addLine2, setAddLine2] = useState();
  const [landmark, setLandmark] = useState();
  const [mapUrl, setMapUrl] = useState();
  const [district, setDistrict] = useState();
  const [area, setArea] = useState();
  const [pincode, setPincode] = useState();
  const [whatsapp, setWhatsapp] = useState();

  const handleOpen = () => setOpen(!open);
  const handleCancel = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setOpen(!open);
    const id = name.replace(/\s+/g, "").toLowerCase();
    console.log("before");
    addServicesAndProductsDoc(
      rootprevious,
      beforeprevious,
      previous,
      {
        name: name,
        businessname: businessName,
        mobile: number,
        whatsapp: whatsapp,
        addline1: addLine1,
        addline2: addLine2,
        landmark: landmark,
        area: area,
        pincode: pincode,
        district: district,
        mapurl: mapUrl,
        about: about,
      },
      profile,
      photos,
      "services",
      id
    );
  };
  return (
    <>
      <Button className="bg-kaavi" onClick={handleOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full font-inter">
          <form action="submit">
            <div className="flex flex-col justify-between items-start">
              <p className="text-xl font-medium mb-1">Profile Picture</p>
              <Input
                type="file"
                onChange={(e) => setProfile(e.target.files[0])}
                className="border border-kaavi mb-6 w-60"
                accept="image/*"
              />
              <p className="text-xl font-medium mb-1">Name</p>
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Business Name</p>
              <Input
                type="text"
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Name"
                className="border border-kaavi pl-4 py-3 mb-6"
              />

              <p className="text-xl font-medium mb-1">Mobile Number</p>
              <Input
                type="number"
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Mobile Number"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Whatsapp Number</p>
              <Input
                type="text"
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Name"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">About</p>
              <textarea
                name="about"
                id="about"
                onChange={(e) => setAbout(e.target.value)}
                rows={5}
                cols={40}
                className="border border-kaavi pl-4 py-3 mb-6"
              ></textarea>
              <p className="text-xl font-medium mb-1">Photos</p>
              <Input
                type="file"
                placeholder="photos"
                onChange={(e) => setPhotos([...e.target.files])}
                className="border border-kaavi mb-6 w-60"
                accept="image/*"
                multiple
              />
              <p className="text-xl font-medium mb-1">Address Line 1</p>
              <input
                type="text"
                onChange={(e) => setAddLine1(e.target.value)}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Address Line 2</p>
              <input
                type="text"
                onChange={(e) => setAddLine2(e.target.value)}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Landmark</p>
              <input
                type="text"
                onChange={(e) => setLandmark(e.target.value)}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Area</p>
              <input
                type="text"
                placeholder="Eg: RS Puram"
                onChange={(e) => setArea(e.target.value)}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Pincode</p>
              <input
                type="text"
                placeholder="Eg: 641032"
                onChange={(e) => setPincode(e.target.value)}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">District</p>
              <input
                type="text"
                placeholder="District"
                onChange={(e) => setDistrict(e.target.value)}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">Google Maps Link</p>
              <input
                type="text"
                placeholder="Google Maps URL"
                onChange={(e) => setMapUrl(e.target.value)}
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <div className="flex justify-between">
                <button
                  className="border border-black mr-2 p-2 px-14"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-kaavi p-2 px-14"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default AddServiceDocPopup;
