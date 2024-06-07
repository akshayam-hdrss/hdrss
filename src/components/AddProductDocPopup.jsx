"use client";
import React, { useState } from "react";
import { addDocument } from "@/firebase/firestore/addData";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

function AddProductDocPopup({
  open,
  setOpen,
  previous,
  beforeprevious,
  rootprevious,
  previousname
}) {
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [about, setAbout] = useState();
  const [photos, setPhotos] = useState();
  const handleProfile = (e) => {
    setProfile(e.target.files[0]);
  };
  const handlePrice = (e) => setPrice(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAbout = (e) => setAbout(e.target.value);
  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };
  const handleOpen = () => setOpen(!open);
  const handleCancel = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setOpen(!open);
    addDocument(
      rootprevious,
      beforeprevious,
      previous,
      {
        name: name,
        about: about,
        price: price,
      },
      profile,
      photos,
      "products"
    );
  };
  return (
    <>
      <Button className="bg-kaavi" onClick={handleOpen}>
        Add new {previousname}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <Card>
          <CardBody>
            <form action="submit">
              <div className="flex flex-col justify-between items-start">
                <p className="text-xl font-medium mb-1">Product Image</p>
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

                <p className="text-xl font-medium mb-1">Price(in rupees)</p>
                <Input
                  type="number"
                  value={price}
                  onChange={handlePrice}
                  placeholder="Price"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">About</p>
                <textarea
                  name="about"
                  id="about"
                  value={about}
                  onChange={handleAbout}
                  rows={3}
                  cols={25}
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

export default AddProductDocPopup;
