import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { editServicesDoc } from "@/firebase/firestore/editData";
import { IoClose } from "react-icons/io5";

function EditDocPopup({
  open,
  setOpen,
  data,
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  previousname,
  type,
}) {
  const [editOption, setEditOption] = useState(null);
  const [editName, setEditName] = useState();
  const [editNumber, setEditNumber] = useState();
  const [editAbout, setEditAbout] = useState();
  const [editDistrict, setEditDistrict] = useState();
  const [editLocation, setEditLocation] = useState();
  const [editProfile, setEditProfile] = useState();
  const [editPhotos, setEditPhotos] = useState();
  const [deleteDoc, setDeleteDoc] = useState();
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  let profilepic;
  let oldphotos;
  const handleEditOption = (e) => {
    setEditOption(e.target.value);
  };
  const handleProfile = (e) => {
    setEditProfile(e.target.files[0]);
  };
  const handlePhotos = (e) => {
    setEditPhotos([...e.target.files]);
  };
  const handleAdd = async () => {
    setOpen(!open);
    let updatedData = {
      ...(editName
        ? { name: editName }
        : { name: deleteDoc.name }),
      ...(editNumber
        ? { mobile: editNumber }
        : { mobile: deleteDoc.mobile }),
      ...(editAbout
        ? { about: editAbout }
        : { about: deleteDoc.about }),
      ...(editDistrict
        ? { district: editDistrict }
        : { district: deleteDoc.district }),
      ...(editLocation
        ? { location: editLocation }
        : { location: deleteDoc.location }),
      ...(editProfile ? {} : { profile: deleteDoc.profile }),
      ...(editProfile ? {} : { photos: deleteDoc.photos }),
    };
    data.map((item) => {
      if (item.id === editOption) {
        profilepic = item.profilepicture;
        oldphotos = item.photos;
      }
    });
    editServicesDoc(
      rootprevious,
      beforeprevious,
      previous,
      editOption,
      updatedData,
      profilepic,
      oldphotos,
      type,
      editProfile,
      editPhotos
    );

    console.log("deleted successfully");
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
      <Dialog open={open} handler={handleOpen} className="overflow-scroll">
        <Card className="mx-auto w-full max-w-[24rem] font-inter overflow-y-scroll">
          <CardBody className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Delete a Service
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>

            <Typography className="-mb-2" variant="h6">
              Select the Service you want to edit
            </Typography>
            <select
              name="servicename"
              id="name"
              value={editOption}
              onChange={handleEditOption}
              className="p-3 border-deep-orange-200 border rounded-xl"
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
                  onChange={handleProfile}
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
                <p className="text-xl font-medium mb-1">Position</p>
                <Input
                  type="text"
                  defaultValue={previousname}
                  placeholder="position"
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
                <p className="text-xl font-medium mb-1">About</p>
                <textarea
                  name="about"
                  id="about"
                  defaultValue={deleteDoc?.about}
                  onChange={(e) => setEditAbout(e.target.value)}
                  rows={5}
                  cols={30}
                  className="border border-kaavi pl-4 py-3 mb-6"
                ></textarea>
                <p className="text-xl font-medium mb-1">Photos</p>
                <Input
                  type="file"
                  placeholder="photos"
                  onChange={handlePhotos}
                  className="border border-kaavi mb-6 w-60"
                  accept="image/*"
                  multiple
                />
                <p className="text-xl font-medium mb-1">District</p>
                <input
                  type="text"
                  placeholder="District"
                  defaultValue={deleteDoc?.district}
                  onChange={(e) => setEditDistrict(e.target.value)}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
                <p className="text-xl font-medium mb-1">Area and Pincode</p>
                <input
                  type="text"
                  placeholder="Eg: RS Puram, 641002"
                  defaultValue={deleteDoc?.location}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="border border-kaavi pl-4 py-3 mb-6"
                />
              </div>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-kaavi text-white"
              type="submit"
              onClick={handleAdd}
              fullWidth
            >
              Enter
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default EditDocPopup;
