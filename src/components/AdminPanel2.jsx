"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MdAdd } from "react-icons/md";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import ServiceCard from "@/components/ServiceCard";
import { addLevel2Service } from "@/firebase/firestore/addData";
import { subscribeToLevel2 } from "@/firebase/firestore/getData";

function AdminPanel2() {
  const [open, setOpen] = useState(false);
  const [level2Name, setLevel2Name] = useState("");
  const [level2Icon, setLevel2Icon] = useState(null);
  const [data, setData] = useState(null);
  const searchparam = useSearchParams();
  const previous = searchparam.get("previous");
  const handleOpen = () => setOpen(!open);
  const handleLevel2Name = (event) => {
    setLevel2Name(event.target.value);
  };
  const handleLevel2Icon = (event) => {
    setLevel2Icon(event.target.files[0]);
  };
  const addService = () => {
    setOpen(!open);
    const capitalized =
      level2Name.charAt(0).toUpperCase() + level2Name.slice(1);
    addLevel2Service(previous, level2Name, { name: capitalized }, level2Icon);
  };

  useEffect(() => {
    const unsubscribe = subscribeToLevel2(setData, previous);
    return () => unsubscribe();
  }, []);
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold pb-20">
        {previous.charAt(0).toUpperCase() + previous.slice(1)}
      </h1>
      <div className="grid grid-cols-3 place-items-center gap-y-10 gap-x-10">
        {data &&
          data.map((item) => (
            <ServiceCard
              name={item.id}
              url={item.iconUrl}
              slug={`/admin/level3?previous=${item.id}&beforeprevious=${previous}`}
            />
          ))}
        <Button
          onClick={handleOpen}
          className=" bg-gradient-to-b from-[#FCEDED] to-[#F6F6F6] flex flex-col justify-center items-center w-[100px] h-[100px] bg-white border-2 border-solid border-[#909090] rounded-2xl cursor-pointer"
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
              <Input
                label="Name"
                onChange={handleLevel2Name}
                size="lg"
                required
              />
              <Typography className="-mb-2" variant="h6">
                Give Icon
              </Typography>

              <Input
                type="file"
                accept="image/*"
                label="Icon"
                size="lg"
                required
                onChange={handleLevel2Icon}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                className="bg-kaavi text-white"
                type="submit"
                onClick={addService}
                fullWidth
              >
                Enter
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </div>
    </div>
  );
}

export default AdminPanel2;
