"use client";
import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { getCharity, editCharity } from "@/firebase/firestore/charity";

function EditCharity({ open, setOpen, id }) {
  const [editData, setEditData] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editVideo, setEditVideo] = useState("");
  const [editProfile, setEditProfile] = useState(null);
  const [editBackground, setEditBackground] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  const handleSubmit = async () => {
    await editCharity(
      editName,
      editDescription,
      editVideo,
      editProfile,
      editBackground,
      id
    );
    setOpen(false);
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await getCharity(id);
      setEditData(res);
    };
    fetch();
  }, [open]);
  useEffect(() => {
    if (editData) {
      setEditName(editData.name);
      setEditDescription(editData.description);
      setEditVideo(editData.video);
      // Update other states as needed
    }
  }, [editData]);

  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi mx-2 my-3">
        Edit
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="overflow-scroll"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <DialogBody className="mx-auto w-full font-inter">
          <div>
            <h1 className="text-2xl font-bold">Edit Charity</h1>
            <div className="pt-10 pb-6 flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the name of the charity</p>
                <input
                  type="text"
                  placeholder="Name"
                  defaultValue={editData && editData.name}
                  onChange={(e) => setEditName(e.target.value)}
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
                  defaultValue={editData && editData.description}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                  className="border border-kaavi w-fit pr-6 pl-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the video link</p>
                <input
                  type="text"
                  defaultValue={editData && editData.video}
                  onChange={(e) => setEditVideo(e.target.value)}
                  placeholder="Youtube link"
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the profile picture</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditProfile(e.target.files[0])}
                  className="border border-kaavi w-fit pr-6 pl-2 py-2"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="font-medium">Enter the background image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditBackground(e.target.files[0])}
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
    </>
  );
}

export default EditCharity;
