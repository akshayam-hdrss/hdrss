import React, { useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import {
  deleteLevel1ServiceAds,
  deleteLevel2ServiceAds,
  deleteLevel3ServiceAds,
  deleteLevel4ServiceAds,
  updateLevel1ServiceAds,
  updateLevel2ServiceAds,
  updateLevel3ServiceAds,
  updateLevel4ServiceAds,
} from "@/firebase/firestore/advertisements";

function Ads({
  open,
  setOpen,
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  type,
  data,
}) {
  const [ads, setAds] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleAds = (e) => {
    setAds([...e.target.files]);
  };
  const handleDelete = async (adToDelete) => {
    if (rootprevious != null) {
      await deleteLevel4ServiceAds(
        rootprevious,
        beforeprevious,
        previous,
        adToDelete,
        type
      );
    } else if (beforeprevious != null) {
      await deleteLevel3ServiceAds(beforeprevious, previous, adToDelete, type);
    } else if (previous != null) {
      await deleteLevel2ServiceAds(previous, adToDelete, type);
    } else {
      await deleteLevel1ServiceAds(adToDelete, type);
    }
    console.log("added");
    setOpen(!open);
  };

  const handleSubmit = async () => {
    if (rootprevious != null) {
      await updateLevel4ServiceAds(
        rootprevious,
        beforeprevious,
        previous,
        ads,
        type
      );
    } else if (beforeprevious != null) {
      await updateLevel3ServiceAds(beforeprevious, previous, ads, type);
    } else if (previous != null) {
      await updateLevel2ServiceAds(previous, ads, type);
    } else {
      console.log("level1");
      await updateLevel1ServiceAds(ads, type);
    }
    console.log("added");
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
                Update {previous} Page Ads
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

export default Ads;
