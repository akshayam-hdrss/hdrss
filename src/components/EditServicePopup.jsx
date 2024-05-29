import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { editProducts, editServices } from "@/firebase/firestore/editData";

function EditServicePopup({
  open,
  setOpen,
  data,
  rootprevious,
  beforeprevious,
  previous,
  name,
}) {
  const [editOption, setEditOption] = useState(null);
  const [editName, setEditName] = useState(null);
  const [editIcon, setEditIcon] = useState(null);
  let iconUrl;
  const handleOpen = () => setOpen(!open);
  const handleEdit = async () => {
    setOpen(!open);
    data.map((item) => {
      if (item.id === editOption) {
        iconUrl = item.iconUrl;
      }
    });
    if (name == "services") {
      editServices(
        rootprevious,
        beforeprevious,
        previous,
        editOption,
        editName,
        editIcon,
        iconUrl
      );
    } else if (name == "products") {
      editProducts(
        rootprevious,
        beforeprevious,
        previous,
        editOption,
        editName,
        editIcon,
        iconUrl
      );
    }

    console.log("edited successfully");
  };
  const handleEditOption = (e) => {
    setEditOption(e.target.value);
  };
  const handleNameChange = (e) => {
    setEditName(e.target.value);
  };
  const handleIconChange = (e) => {
    setEditIcon(e.target.value);
  };
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi">
        Edit
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <Card className="mx-auto w-full max-w-[24rem] font-inter">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add a Service
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter details for the Level 1 service.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Select the Service you want to change
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
            <Typography className="-mb-2" variant="h6">
              Name of the Service
            </Typography>
            <input
              type="text"
              value={editName}
              onChange={handleNameChange}
              className="border mb-5 p-1 border-deep-orange-200"
            />
            <Typography className="-mb-2" variant="h6">
              Give Icon
            </Typography>
            <input type="file" value={editIcon} onChange={handleIconChange} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-kaavi text-white"
              type="submit"
              onClick={handleEdit}
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

export default EditServicePopup;
