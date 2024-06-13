"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import {
  addDistrictLeader,
  addStateLeader,
} from "../firebase/firestore/addLeaders";

function AddLeaderPopup({ open, setOpen }) {
  const [name, setName] = useState();
  const [position, setPosition] = useState();
  const [profilepic, setProfilepic] = useState();
  const [level, setLevel] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [district, setDistrict] = useState();
  let id;
  let districtlower;
  const handleOpen = () => setOpen(!open);
  const handleadd = () => {
    setOpen(!open);
    if (name) {
      id = name.replace(/\s+/g, "").toLowerCase();
      districtlower = district.toLowerCase();
    }
    if (level === "district") {
      addDistrictLeader(
        id,
        districtlower,
        district,
        { name: name, position: position, ...(mobileNumber && {mobile: mobileNumber}) },
        profilepic
      );
    } else if (level === "state") {
      addStateLeader(
        id,
        { name: name, position: position, mobile: mobileNumber },
        profilepic
      );
    }
    setLevel("");
  };
  return (
    <>
      <Button onClick={handleOpen} className="bg-kaavi cursor-pointer">
        Add
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <Card className="mx-auto w-full max-w-[24rem] font-inter">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add Leader
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter details for the State Level Leader
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Name of the Leader
            </Typography>
            <Input
              label="Name"
              onChange={(e) => setName(e.target.value)}
              size="lg"
              required
            />
            <Typography className="-mb-2" variant="h6">
              Enter the Position
            </Typography>

            <Input
              type="text"
              size="lg"
              label="position"
              required
              onChange={(e) => setPosition(e.target.value)}
            />

            <Typography className="-mb-2" variant="h6">
              Enter Mobile Number
            </Typography>

            <Input
              type="number"
              size="lg"
              label="mobile"
              required
              onChange={(e) => setMobileNumber(e.target.value)}
            />

            <Typography className="-mb-2" variant="h6">
              Give Profile Picture
            </Typography>

            <Input
              type="file"
              size="lg"
              label="profilepic"
              accept="image/*"
              required
              onChange={(e) => setProfilepic(e.target.files[0])}
            />
            <Typography className="-mb-2" variant="h6">
              Enter the Level
            </Typography>

            <select
              name="Level"
              id="level"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value=" ">Select level</option>
              <option value="district">District Level</option>
              <option value="state">State Level</option>
            </select>

            {level === "district" && (
              <>
                <Typography className="-mb-2" variant="h6">
                  Enter the District
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  label="district"
                  required
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </>
            )}
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

export default AddLeaderPopup;
