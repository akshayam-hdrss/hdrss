import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { editDaily, getDaily } from "../../../firebase/firestore/daily";

function EditDaily({ open, setOpen }) {
  const [editId, setEditId] = useState();
  const [daily, setDaily] = useState();
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [date, setDate] = useState(null);
  let data = {};
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    console.log(editId);
    if (title != null) {
      data.title = title;
    }
    if (date != null) {
      data.date = date;
    }
    if (link != null) {
      data.link = link;
    }
    await editDaily(data, editId);
    setOpen(false);
  };
  useEffect(() => {
    const fetch = async () => {
      const daily = await getDaily();
      setDaily(daily);
    };
    fetch();
  }, [open]);
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi">
        Edit
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
                Edit Daily Astrology
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>
            <div>
              <Typography variant="h4" color="blue-gray">
                Select for Edit
              </Typography>
              <select
                name="select"
                id="select"
                onChange={(e) => setEditId(e.target.value)}
              >
                <option value=" "></option>
                {daily &&
                  daily.map((item) => (
                    <option value={item.id}>{item.data.title}</option>
                  ))}
              </select>

              <Typography variant="h4" color="blue-gray">
                Enter new title
              </Typography>
              <input type="text" onChange={(e) => setTitle(e.target.value)} />

              <Typography variant="h4" color="blue-gray">
                Enter new Date
              </Typography>
              <input type="text" onChange={(e) => setDate(e.target.value)} />

              <Typography variant="h4" color="blue-gray">
                Enter new Link
              </Typography>
              <input type="text" onChange={(e) => setLink(e.target.value)} />
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

export default EditDaily;
