import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { GiSettingsKnobs } from "react-icons/gi";
import Slider from "@mui/material/Slider";
import { applyProductFilters } from "../../firebase/firestore/products";
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
function ProductsFilter({
  open,
  setOpen,
  price,
  setPrice,
  id,
  gender,
  setGender,
  size,
  setSize,
  data,
  setData,
}) {
  const [maleTrue, setMaleTrue] = useState(false);
  const [femaleTrue, setFemaleTrue] = useState(false);
  const minDistance = 50;
  const OpenDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  const handlePrice = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the size if it's checked
      setSize((prevSizes) => [...prevSizes, value]);
    } else {
      // Remove the size if it's unchecked
      setSize((prevSizes) => prevSizes.filter((size) => size !== value));
    }
  };
  const applyFilter = async () => {
    let updatedGender = [];

    if (maleTrue && femaleTrue) {
      updatedGender = ["male", "female"];
    } else if (maleTrue) {
      updatedGender = ["male"];
    } else if (femaleTrue) {
      updatedGender = ["female"];
    } else {
      updatedGender = ["male", "female"];
    }

    setGender(updatedGender); // Update the state
    console.log(updatedGender); // This will log the correct value

    const filteredData = await applyProductFilters(
      id,
      price[0],
      price[1],
      updatedGender,
      size
    );
    setData(filteredData);
    setOpen(false);
  };

  return (
    <>
      <button onClick={OpenDrawer}>
        <div
          className={`flex gap-x-2 border border-grey w-fit px-4 py-2 rounded-full items-center ${
            open ? "bg-kaavi text-white" : " "
          }`}
        >
          <GiSettingsKnobs fontSize={20} />
          <p className="font-medium">Filters</p>
        </div>
      </button>
      <Drawer
        placement="bottom"
        open={open}
        onClose={closeDrawer}
        className="overflow-y-scroll overflow-x-hidden"
      >
        <div className="py-12 px-6 mb-10">
          <h1 className="font-bold text-2xl px-0 mx-0 pb-6">Gender</h1>
          <div
            onClick={() => setMaleTrue(!maleTrue)}
            className={`rounded-full border border-grey w-fit inline p-3 px-5 mr-4 ${
              maleTrue && "bg-kaavi text-white"
            }`}
          >
            Male
          </div>
          <div
            onClick={() => setFemaleTrue(!femaleTrue)}
            className={`rounded-full border border-grey w-fit inline p-3 px-5 ${
              femaleTrue && "bg-kaavi text-white"
            }`}
          >
            Female
          </div>
          <h1 className="font-bold text-2xl px-0 mx-0 pb-6 pt-10">Size</h1>
          <div className="grid grid-cols-2 gap-y-2">
            {footwearSize.map((size, index) => (
              <div className="flex items-center gap-x-2">
                <label className="text-lg" htmlFor={index}>
                  {size}
                </label>
                <input
                  type="checkbox"
                  name="size"
                  id={index}
                  value={size}
                  onChange={handleSizeChange}
                />
              </div>
            ))}
          </div>
          <h1 className="font-bold text-2xl px-0 mx-0 pb-4 pt-10">
            Price range
          </h1>
          <p className="pb-4">
            ₹{price[0]} - ₹{price[1]}
          </p>
          <Slider
            getAriaLabel={() => "Price range"}
            value={price}
            max={2500}
            min={500}
            step={50}
            disableSwap
            onChange={handlePrice}
            valueLabelDisplay="auto"
          />
        </div>
        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 mt-28">
          <button
            onClick={applyFilter}
            className="bg-kaavi text-white rounded-md py-3 w-full"
          >
            Apply all Filters
          </button>
        </div>
      </Drawer>
    </>
  );
}

export default ProductsFilter;
