"use client";
import React, { useEffect, useState } from "react";
import { Button, Dialog, Input, DialogBody } from "@material-tailwind/react";
import { addProduct } from "@/firebase/firestore/products";
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
  const [photos, setPhotos] = useState();
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

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    let newValue;
    if (type === "number") {
      newValue = parseFloat(value);
    } else if (value === "true" || value === "false") {
      newValue = value === "true" ? true : false;
    } else {
      newValue = value;
    }
    setData({
      ...data,
      [id]: newValue,
    });
  };

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
    setOpen(!open);
    await addProduct(previous, data, profile, photos);
  };

  useEffect(() => {
    setData({});
  }, [open]);

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
                id="name"
                onChange={handleChange}
                placeholder="Name"
                className="border border-kaavi pl-4 py-3 mb-6"
              />

              <p className="text-xl font-medium mb-1">Price(in rupees)</p>
              <Input
                type="number"
                id="price"
                onChange={handleChange}
                placeholder="Price"
                className="border border-kaavi pl-4 py-3 mb-6"
              />
              <p className="text-xl font-medium mb-1">
                Size (If applicable - leave it blank otherwise)
              </p>
              <select
                name="size"
                id="size"
                onChange={handleChange}
                className="px-10 py-4 mb-10 border border-kaavi"
              >
                <option value=" "> </option>
                {sizes &&
                  sizes.map((size, index) => (
                    <option value={size} key={index}>
                      {size}
                    </option>
                  ))}
              </select>
              <p className="text-xl font-medium mb-1">
                Gender (If applicable - leave it blank otherwise)
              </p>
              <select
                name="gender"
                id="gender"
                onChange={handleChange}
                className="px-10 py-4 mb-10 border border-kaavi"
              >
                <option value=" "> </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <p className="text-xl font-medium mb-1">About</p>
              <textarea
                name="about"
                id="about"
                onChange={handleChange}
                rows={3}
                cols={25}
                className="border border-kaavi pl-4 py-3 mb-6"
              ></textarea>
              <p className="text-xl font-medium mb-1">Contact Number</p>
              <Input
                type="number"
                id="mobile"
                onChange={handleChange}
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
