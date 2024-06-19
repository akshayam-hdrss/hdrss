"use client";
import React, { useState } from "react";
import { addDocument } from "@/firebase/firestore/addData";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Input,
} from "@material-tailwind/react";

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
  const [number, setNumber] = useState();
  const [about, setAbout] = useState();
  const [photos, setPhotos] = useState([]);
  const [district, setDistrict] = useState();
  const [location, setLocation] = useState();
  const handleProfile = (e) => {
    setProfile(e.target.files[0]);
  };
  const handleName = (e) => setName(e.target.value);
  const handleNumber = (e) => setNumber(e.target.value);
  const handleAbout = (e) => setAbout(e.target.value);
  const handlePhotos = (e) => {
    setPhotos([...e.target.files]);
  };
  const handleDistrict = (e) => setDistrict(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
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
    addDocument(
      rootprevious,
      beforeprevious,
      previous,
      {
        name: name,
        position: previous,
        mobile: number,
        about: about,
        district: district,
        location: location,
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
      <Dialog open={open} handler={handleOpen} className="overflow-y-scroll">
        <Card>
          <CardBody>
            <form action="submit">
              <div className="flex flex-col justify-between items-start">
                <p className="text-xl font-medium mb-1">Profile Picture</p>
                <Input
                  type="file"
                  onChange={handleProfile}
                  className="border border-kaavi mb-6 w-60"
                  accept="image/*"
                />
                <p className="text-xl font-medium mb-1">Name</p>
                <Input
                  type="text"
                  value={name}
                  onChange={handleName}
                  placeholder="Name"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Position</p>
                <Input
                  type="text"
                  defaultValue={previousname}
                  placeholder="position"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Mobile Number</p>
                <Input
                  type="number"
                  value={number}
                  onChange={handleNumber}
                  placeholder="Mobile Number"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">About</p>
                <textarea
                  name="about"
                  id="about"
                  value={about}
                  onChange={handleAbout}
                  rows={5}
                  cols={30}
                  className="border border-kaavi pl-4 py-3 mb-6"
                ></textarea>
                <p className="text-xl font-medium mb-1">Photos</p>
                <Input
                  type="file"
                  placeholder="photos"
                  onChange={handlePhotos}
                  className="border border-kaavi mb-6 w-60"
                  accept="image/*"
                  multiple
                />
                <p className="text-xl font-medium mb-1">District</p>
                <input
                  type="text"
                  placeholder="District"
                  value={district}
                  onChange={handleDistrict}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Area and Pincode</p>
                <input
                  type="text"
                  placeholder="Eg: RS Puram, 641002"
                  value={location}
                  onChange={handleLocation}
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
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}

export default AddServiceDocPopup;
