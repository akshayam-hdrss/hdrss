"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import {
  getDistrictLeaders,
  getLeadersDistrict,
  getStateLeaders,
} from "@/firebase/firestore/addLeaders";

function MembersPage() {
  const [stateLeaders, setStateLeaders] = useState();
  const [districtLeaders, setDistrictLeaders] = useState();
  const [district, setDistrict] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await getDistrictLeaders(selectedDistrict);
      setDistrictLeaders(data2);

      const data1 = await getStateLeaders();
      setStateLeaders(data1);

      const data3 = await getLeadersDistrict();
      setDistrict(data3);
    };

    fetchData();
    console.log(districtLeaders);
  }, [selectedDistrict]);

  return (
    <div>
      <Header />
      <BackButton route="/" />
      <div className="p-6">
        <h1 className="font-koulen text-3xl text-grey">HDRSS - MEMBERS</h1>
        <h2 className="text-grey font-bold text-xl mt-3 mb-6">
          State Level Leaders
        </h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8">
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
                <p className="font-bold text-lg">{doc.data.name}</p>
                <p className="text-center">{doc.data.position}</p>
              </div>
            ))}
        </div>

        <h2 className="text-xl text-grey font-bold mt-10 mb-4">
          District Level Leaders
        </h2>
        <select
          name="district"
          id="district"
          className="border border-grey text-kaavi font-bold p-1 rounded-lg mb-6"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value=" ">Select District</option>
          {district &&
            district.map((doc, index) => (
              <option key={index} value={doc.id}>
                {doc.data.name}
              </option>
            ))}
        </select>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8">
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
                <p className="font-bold text-lg">{doc.data.name}</p>
                <p className="text-center">{doc.data.position}</p>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MembersPage;
