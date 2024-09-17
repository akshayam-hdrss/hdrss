"use client";
import React, { useState } from "react";
import { addServicesAndProductsDoc } from "@/firebase/firestore/servicesProducts";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  DialogBody,
} from "@material-tailwind/react";
import { addProduct } from "../../../firebase/firestore/products";
const footwearSize = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const shirtSize = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "4XL",
  "36",
  "38",
  "40",
  "42",
  "44",
];
function AddProductDocPopup({ open, setOpen, previous }) {
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [price, setPrice] = useState(0);
  const [about, setAbout] = useState();
  const [photos, setPhotos] = useState();
  const [size, setSize] = useState();
  const [gender, setGender] = useState();
  const [data, setData] = useState({});
  let sizes;
  if (previous == "footwear") {
    sizes = footwearSize;
  } else if (previous == "shirts") {
    sizes = shirtSize;
  }
  const handleProfile = (e) => {
    setProfile(e.target.files[0]);
  };
  const handlePrice = (e) => setPrice(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleNumber = (e) => setNumber(e.target.value);
  const handleAbout = (e) => setAbout(e.target.value);
  const handleSize = (e) => setSize(e.target.value);
  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };
  const handleOpen = () => setOpen(!open);
  const handleCancel = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    setData({
      name: name,
      price: price,
      number: number,
      about: about,
      size: size,
      gender: gender,
    });
    setOpen(!open);
    await addProduct(
      previous,
      name,
      price,
      number,
      about,
      gender,
      size,
      profile,
      photos
    );
    setName("");
    setPrice();
    setAbout("");
    setPhotos();
  };
  return (
    <>
      <Button className="bg-kaavi" onClick={handleOpen}>
        Add new {previous}
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
              <p className="text-xl font-medium mb-1">Size</p>
              <select
                name="size"
                id="size"
                onChange={(e) => setSize(e.target.value)}
                className="px-10 py-4 mb-10 border border-kaavi"
              >
                {sizes &&
                  sizes.map((size, index) => (
                    <option value={size} key={index}>
                      {size}
                    </option>
                  ))}
              </select>
              <p className="text-xl font-medium mb-1">Gender</p>
              <select
                name="gender"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
                className="px-10 py-4 mb-10 border border-kaavi"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

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
              <p className="text-xl font-medium mb-1">Contact Number</p>
              <Input
                type="number"
                value={number}
                onChange={handleNumber}
                placeholder="Contact Number"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
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
        </DialogBody>
      </Dialog>
    </>
  );
}

export default AddProductDocPopup;
