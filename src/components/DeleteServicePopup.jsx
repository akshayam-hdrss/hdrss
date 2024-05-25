import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { deleteServices } from "@/firebase/firestore/deleteData";

function DeleteServicePopup({
  open,
  setOpen,
  data,
  rootprevious,
  beforeprevious,
  previous,
}) {
  const [deleteOption, setDeleteOption] = useState(null);
  const handleOpen = () => setOpen(!open);
  let iconUrl;
  const handleDeleteOption = (e) => {
    setDeleteOption(e.target.value);
  };
  const handleDelete = async () => {
    setOpen(!open);
    data.map((item) => {
      if (item.id === deleteOption) {
          iconUrl = item.iconUrl;
      }
    });
    deleteServices(
      rootprevious,
      beforeprevious,
      previous,
      deleteOption,
      iconUrl
    );
  };
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi">
        Delete
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

export default DeleteServicePopup;
