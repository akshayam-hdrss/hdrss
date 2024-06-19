"use client";
import React, { useState, useEffect } from "react";
import AddLeaderPopup from "@/components/Admin/Leaders/AddLeaderPopup";
import {
  getDistrictLeaders,
  getExistingSNos,
  getLeadersDistrict,
  getMaxSno,
  getStateLeaders,
} from "@/firebase/firestore/addLeaders";
import EditLeaderPopup from "@/components/Admin/Leaders/EditLeaderPopup";
import DeleteLeaderPopup from "@/components/Admin/Leaders/DeleteLeaderPopup";
import BackButton from "@/components/ui/BackButton";

function LeadersPage() {
  const [districtLeaders, setDistrictLeaders] = useState("");
  const [stateLeaders, setStateLeaders] = useState();
  const [existingdistricts, setExistingDistricts] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [addOpen, setAddOpen] = useState();
  const [editOpen, setEditOpen] = useState();
  const [deleteOpen, setDeleteOpen] = useState();
  const [maxSnoState, setMaxSnoState] = useState();
  const [existingSnos, setExistingSnos] = useState();
  const [stateAvailableSNos, setStateAvailableSnos] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await getStateLeaders();
      setStateLeaders(data2);
      const data3 = await getLeadersDistrict();
      setExistingDistricts(data3);
    };
    fetchData();
  }, [editOpen, deleteOpen]);
  useEffect(() => {
    const fetchData = async () => {
      const data1 = await getDistrictLeaders(selectedDistrict);
      setDistrictLeaders(data1);
    };
    fetchData();
  }, [selectedDistrict, editOpen, deleteOpen]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getMaxSno();
      setMaxSnoState(data);
    };
    function getAvailableSNos(existingSNos, limit) {
      const availableSNos = [];
      let nextSNo = 1;

      while (availableSNos.length < limit - 2) {
        if (!existingSNos.includes(nextSNo)) {
          availableSNos.push(nextSNo);
        }
        nextSNo++;
      }

      return availableSNos;
    }
    const fetch2 = async () => {
      const data = await getExistingSNos();
      setExistingSnos(data);
    };
    fetch();
    fetch2();
    const data = getAvailableSNos(existingSnos, maxSnoState);
    setStateAvailableSnos(data);
  }, [addOpen, editOpen]);

  return (
    <div className="p-10">
      <BackButton route="/admin" />
      <h1 className="text-2xl mb-10 font-bold">Leaders</h1>
      <AddLeaderPopup
        open={addOpen}
        setOpen={setAddOpen}
        maxSno={maxSnoState}
      />
      <EditLeaderPopup
        open={editOpen}
        setOpen={setEditOpen}
        districts={existingdistricts}
      />
      <DeleteLeaderPopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        districts={existingdistricts}
      />
      <h1 className="text-xl font-bold mt-4 mb-10">State Level Leaders</h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 ">
        {stateLeaders &&
          stateLeaders.map((doc, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-[150px] h-[150px] mb-1">
                <img
                  src={doc.data.profile}
                  alt="Profile"
                  className="object-cover aspect-square"
                />
              </div>
              <h1 className="font-bold text-lg">{doc.data.name}</h1>
              <h2 className="text-center">{doc.data.position}</h2>
            </div>
          ))}
      </div>

      <h1 className="text-xl font-bold mt-10">District Level Leaders</h1>
      <select
        name="districtleaders"
        id="districts"
        value={selectedDistrict}
        className="mt-4 mb-10 border-2 p-3 rounded-xl border-kaavi"
        onChange={(e) => setSelectedDistrict(e.target.value)}
      >
        <option value=" ">District</option>
        {existingdistricts &&
          existingdistricts.map((doc, index) => (
            <option value={doc.id} key={index}>
              {doc.data.name}
            </option>
          ))}
      </select>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 ">
        {districtLeaders &&
          districtLeaders.map((doc, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-[150px] h-[150px] mb-1">
                <img
                  src={doc.data.profile}
                  alt="Profile"
                  className="object-cover aspect-square"
                />
              </div>
              <h1 className="font-bold text-lg">{doc.data.name}</h1>
              <h2 className="text-center">{doc.data.position}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default LeadersPage;
