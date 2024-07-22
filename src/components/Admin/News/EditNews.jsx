import React, { useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

function EditNews({ open, setOpen }) {
  const [newsTitle, setNewsTitle] = useState();
  const [newsDetails, setNewsDetails] = useState();
  const [newsVideo, setNewsVideo] = useState();
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(!open);
  const handleAdd = () => {};
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi mx-2">
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
                Add News
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>

            <Typography className="-mb-2" variant="h6">
              News Title
            </Typography>
            <input
              type="text"
              onChange={(e) => setNewsTitle(e.target.value)}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              Event Description
            </Typography>

            <textarea
              rows={4}
              cols={50}
              type="text"
              onChange={(e) => setNewsDetails(e.target.value)}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              News Video
            </Typography>
            <input
              type="text"
              onChange={(e) => setNewsVideo(e.target.value)}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              News Date (DD-MM-YYYY)
            </Typography>
            <input
              type="text"
              onChange={(e) => setNewsDate(e.target.value)}
              className="border mb-5 p-1 border-deep-orange-200"
            />
          </div>
        </DialogBody>
        <DialogFooter className="pt-0">
          <Button
            className="bg-kaavi text-white"
            type="submit"
            onClick={handleAdd}
            fullWidth
          >
            Enter
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default EditNews;
