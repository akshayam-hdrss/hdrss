"use client";
import React from "react";
import { useState, useEffect } from "react";
import auth from "@/firebase/config";
import ServiceCard from "./ServiceCard";
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
import { addLevel1Service } from "@/firebase/firestore/addData";
import { subscribeToLevel1 } from "@/firebase/firestore/getData";
function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [level1Name, setLevel1Name] = useState("");
  const [level1Icon, setLevel1Icon] = useState(null);
  const [data, setData] = useState(null);
  const handleLevel1Name = (event) => {
    setLevel1Name(event.target.value);
  };
  const handleLevel1Icon = (event) => {
    setLevel1Icon(event.target.files[0]);
  };
  const handleOpen = () => setOpen(!open);
  const handleSignOut = () => {
    try {
      auth.signOut();
      window.location.replace("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const addService = async () => {
    setOpen(!open);
    const capitalized =
      level1Name.charAt(0).toUpperCase() + level1Name.slice(1);
    addLevel1Service(
      level1Name,
      {
        name: capitalized,
      },
      level1Name,
      level1Icon
    );
  };

  useEffect(() => {
    const unsubscribe = subscribeToLevel1(setData);
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 pt-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-koulen text-grey">admin panel</h1>
        <button
          onClick={handleSignOut}
          className="p-3 bg-kaavi text-white rounded-xl"
        >
          Sign Out
        </button>
      </div>
      <div className="my-8 mt-14">
        <h1 className="font-bold text-2xl mb-8">Services</h1>
        <div className="grid grid-cols-3 place-items-center gap-y-10 gap-x-10">
          {data &&
            data.map((item) => (
              <ServiceCard
                name={item.id}
                url={item.iconUrl}
                slug={`admin/level2?previous=${item.id}`}
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
                  onChange={handleLevel1Name}
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
                  onChange={handleLevel1Icon}
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
    </div>
  );
}

export default AdminPanel;
