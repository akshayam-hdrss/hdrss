import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { addDaily } from "@/firebase/firestore/daily";
function AddDaily({ open, setOpen }) {
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [date, setDate] = useState();
  let data = {};
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    data.title = title;
    data.link = link;
    data.date = date;
    await addDaily(data);
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi">
        Add
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
                Add new Day's special
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>
            <div>
              <Typography variant="h4" color="blue-gray">
                Enter the title
              </Typography>
              <input type="text" onChange={(e) => setTitle(e.target.value)} />
              <Typography variant="h4" color="blue-gray">
                Enter the Youtube Link
              </Typography>
              <input type="text" onChange={(e) => setLink(e.target.value)} />
              <Typography variant="h4" color="blue-gray">
                Enter the Date (DD-MM-YYY)
              </Typography>
              <input type="text" onChange={(e) => setDate(e.target.value)} />
              <button
                className="p-3 text-white bg-kaavi rounded-lg w-full"
                onClick={handleSubmit}
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

export default AddDaily;
