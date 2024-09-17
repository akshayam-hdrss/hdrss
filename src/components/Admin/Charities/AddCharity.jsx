"use client";
import React, { useState } from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";

function AddCharity({ open, setOpen }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [video, setVideo] = useState();
  const [profile, setProfile] = useState();
  const [background, setBackground] = useState();

  const handleOpen = () => setOpen(!open);
  const handleSubmit = async () => {};
  return (
    <div className="p-6">
      <Button onClick={handleOpen} className="bg-kaavi">
        Add new charity
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full font-inter text-black">
          <div>
            <h1 className="font-bold text-xl">Add new Charity</h1>
            <div className="pt-10 pb-6 flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the name of the charity</p>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">
                  Enter the description of the charity
                </p>
                <textarea
                  rows={5}
                  cols={30}
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="border border-kaavi w-fit pr-6 pl-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the video link</p>
                <input
                  type="text"
                  onChange={(e)=>set}
                  placeholder="Youtube link"
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the profile picture</p>
                <input
                  type="file"
                  accept="image/*"
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the background image</p>
                <input
                  type="file"
                  accept="image/*"
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex justify-evenly">
                <button
                  onClick={handleOpen}
                  className="border border-grey px-20 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-kaavi text-white px-20 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default AddCharity;
