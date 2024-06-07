import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { addProduct, addService } from "@/firebase/firestore/addData";

function AddServicePopup({ open, setOpen, beforeprevious, previous, type }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleIcon = (event) => {
    setIcon(event.target.files[0]);
  };
  const handleOpen = () => setOpen(!open);
  const handleadd = async () => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    if (type == "services") {
      addService(
        beforeprevious,
        previous,
        name,
        {
          name: capitalized,
        },
        name,
        icon
      );
    } else if (type == "products") {
      addProduct(
        beforeprevious,
        previous,
        name,
        {
          name: capitalized,
        },
        name,
        icon
      );
    }
    setOpen(false);
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        className=" bg-gradient-to-b from-[#FCEDED] to-[#F6F6F6] flex flex-col justify-center types-center w-[100px] h-[100px] bg-white border-2 border-solid border-[#909090] rounded-2xl cursor-pointer"
      >
        <MdAdd fontSize={50} className="text-black" />
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
              Name of the Service
            </Typography>
            <Input label="Name" onChange={handleName} size="lg" required />
            <Typography className="-mb-2" variant="h6">
              Give Icon
            </Typography>

            <Input
              type="file"
              accept="image/*"
              label="Icon"
              size="lg"
              required
              onChange={handleIcon}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-kaavi text-white"
              type="submit"
              onClick={handleadd}
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

export default AddServicePopup;