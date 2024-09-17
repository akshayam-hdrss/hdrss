import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
  DialogBody,
} from "@material-tailwind/react";
import { editServiceAndProductDocs } from "@/firebase/firestore/servicesProducts";
import { IoClose } from "react-icons/io5";

function EditProductDocPopup({
  open,
  setOpen,
  data,
  previous = null,
}) {
  const [editOption, setEditOption] = useState(null);
  const [editName, setEditName] = useState();
  const [editNumber, setEditNumber] = useState();
  const [editPrice, setEditPrice] = useState();
  const [editAbout, setEditAbout] = useState();
  const [editProfile, setEditProfile] = useState(null);
  const [editPhotos, setEditPhotos] = useState(null);
  const [deleteDoc, setDeleteDoc] = useState();

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const handleAdd = async () => {
    setOpen(!open);
    let updatedData = {
      ...(editName ? { name: editName } : { name: deleteDoc.name }),
      ...(editNumber ? { mobile: editNumber } : { mobile: deleteDoc.mobile }),
      ...(editPrice ? { price: editPrice } : { price: deleteDoc.price }),
      ...(editAbout ? { about: editAbout } : { about: deleteDoc.about }),
    };

    console.log(editProfile);
    editServiceAndProductDocs(
      rootprevious,
      beforeprevious,
      previous,
      editOption,
      updatedData,
      editProfile,
      editPhotos,
      "products"
    );

    console.log("edited successfully");
  };
  useEffect(() => {
    const fetch = () => {
      data &&
        data.map((item) => {
          if (item.id === editOption) {
            setDeleteDoc(item);
          }
        });
    };
    fetch();
  }, [editOption]);
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
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Edit a Product
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>

            <Typography className="-mb-2" variant="h6">
              Select the Product you want to edit
            </Typography>
            <select
              name="servicename"
              id="name"
              value={editOption}
              onChange={(e) => setEditOption(e.target.value)}
              className="p-3 border-deep-orange-200 border rounded-md"
            >
              <option value="">Select any option</option>
              {data &&
                data.map((item, key) => (
                  <option key={key} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <form action="submit">
              <div className="flex flex-col justify-between items-start">
                <p className="text-xl font-medium mb-1">Profile Picture</p>
                <Input
                  type="file"
                  onChange={(e) => setEditProfile(e.target.files[0])}
                  className="border border-kaavi mb-6 w-60"
                  accept="image/*"
                />
                <p className="text-xl font-medium mb-1">Name</p>
                <Input
                  type="text"
                  defaultValue={deleteDoc?.name}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Name"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />

                <p className="text-xl font-medium mb-1">Mobile Number</p>
                <Input
                  type="number"
                  defaultValue={deleteDoc?.mobile}
                  onChange={(e) => setEditNumber(e.target.value)}
                  placeholder="Mobile Number"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Price</p>
                <Input
                  type="number"
                  defaultValue={deleteDoc?.price}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="Price"
                  className="border border-kaavi pl-4 py-3 mb-6"
                />

                <p className="text-xl font-medium mb-1">About</p>
                <textarea
                  name="about"
                  id="about"
                  defaultValue={deleteDoc?.about}
                  onChange={(e) => setEditAbout(e.target.value)}
                  rows={5}
                  cols={70}
                  className="border border-kaavi pl-4 py-3 mb-6"
                ></textarea>
                <p className="text-xl font-medium mb-1">Photos</p>
                <Input
                  type="file"
                  placeholder="photos"
                  onChange={(e) => setEditPhotos([...e.target.files])}
                  className="border border-kaavi mb-6 w-60"
                  accept="image/*"
                  multiple
                />
              </div>
            </form>
          </div>
          <Button
            className="bg-kaavi text-white"
            type="submit"
            onClick={handleAdd}
            fullWidth
          >
            Enter
          </Button>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default EditProductDocPopup;
