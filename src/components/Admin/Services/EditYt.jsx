import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import {
  updateLevel1ServicesYt,
  updateLevel2ServicesYt,
  updateLevel3ServicesYt,
  updateLevel4ServicesYt,
} from "../../../firebase/firestore/servicesyt";

function EditYt({
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  open,
  setOpen,
  type,
}) {
  const [link, setLink] = useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    if (rootprevious != null) {
      await updateLevel4ServicesYt(rootprevious,beforeprevious,previous,link,type)
    }
    if (beforeprevious != null) {
      await updateLevel3ServicesYt(beforeprevious, previous, link, type);
    } else if (previous != null) {
      await updateLevel2ServicesYt(previous, link, type);
    } else {
      await updateLevel1ServicesYt(type, link);
      console.log("updated level 1 yt link");
    }
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi">
        Edit YT link
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
                Edit the Youtube Link
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>
            <div>
              <Typography>Enter the Youtube Link</Typography>
              <input type="text" onChange={(e) => setLink(e.target.value)} />
              <button
                onClick={handleSubmit}
                className="block px-4 py-2 text-center mx-auto mt-4 text-white bg-kaavi rounded-xl"
              >
                Submit
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default EditYt;
