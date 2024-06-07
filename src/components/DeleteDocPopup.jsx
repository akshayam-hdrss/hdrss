import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import {
  deleteProducts,
  deleteServices,
  deleteServicesDoc,
} from "@/firebase/firestore/deleteData";
import { IoClose } from "react-icons/io5";

function DeleteDocPopup(
  open,
  setOpen,
  data,
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  type
) {
  const [deleteOption, setDeleteOption] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let profilepic;
  const handleDeleteOption = (e) => {
    setDeleteOption(e.target.value);
  };
  const handleDelete = async () => {
    setOpen(!open);
    data.map((item) => {
      if (item.id === deleteOption) {
        profilepic = item.profilepicture;
      }
    });
    if (type == "services") {
      deleteServicesDoc(
        rootprevious,
        beforeprevious,
        previous,
        deleteOption,
        profilepic,
        photos,
        "services"
      );
    } else if (type == "products") {
      deleteServicesDoc(
        rootprevious,
        beforeprevious,
        previous,
        deleteOption,
        profilepic,
        photos,
        "products"
      );
    }
    console.log("deleted successfully");
  };
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi">
        Delete
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <Card className="mx-auto w-full max-w-[24rem] font-inter">
          <CardBody className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Delete a Service
              </Typography>
              <IoClose fontSize={30} onClick={handleClose} />
            </div>
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
              value={deleteOption}
              onChange={handleDeleteOption}
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
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-kaavi text-white"
              type="submit"
              onClick={handleDelete}
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

export default DeleteDocPopup;
