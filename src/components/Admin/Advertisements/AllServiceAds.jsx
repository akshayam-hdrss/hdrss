import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import {
  deleteLevel1ServiceAds,
  updateLevel1ServiceAds,
} from "@/firebase/firestore/advertisements";
function AllServiceAds({ open, setOpen, data }) {
  const [ads, setAds] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleAds = (e) => {
    setAds([...e.target.files]);
  };
  const handleSubmit = async () => {
    await updateLevel1ServiceAds(ads);
    console.log("added");
    setOpen(!open);
  };
  const handleDelete = async (adToDelete) => {
    await deleteLevel1ServiceAds(adToDelete);
    setOpen(!open);
  };
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi">
        update Ads
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className=" mx-auto w-full h-full font-inter">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Update All Services Page Ads
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>
            {data &&
              data.map((ad, index) => (
                <div key={index} className="relative">
                  <img
                    src={ad}
                    alt="ad index"
                    className="w-[85%] mx-auto rounded-xl my-2 border border-grey"
                  />
                  <IoClose
                    className="bg-white rounded-full absolute top-0 right-10"
                    fontSize={30}
                    onClick={() => handleDelete(ad)}
                  />
                </div>
              ))}
            <input type="file" multiple onChange={handleAds} accept="image/*" />
            <button
              className="bg-kaavi text-white px-4 py-2 rounded-lg font-bold"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default AllServiceAds;
