"use client";
import React, { useEffect, useState } from "react";
import Ads from "@/components/Admin/Advertisements/Ads";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import {
  getExecutives,
  getUser,
  updateExecutiveStatus,
} from "@/firebase/firestore/user";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";

function AdminDashboard() {
  const [adsOpen, setAdsOpen] = useState();
  const [ads, setAds] = useState();
  const [executives, setExecutives] = useState();
  const [toggleStatus, setToggleStatus] = useState({}); // Add a state to track toggle status

  useEffect(() => {
    const fetch = async () => {
      const res = await getServiceAds(null, null, null, null, true);
      setAds(res);
      const data = await getExecutives();
      setExecutives(data);
      const initialToggleStatus = {};
      data.forEach((exec) => {
        initialToggleStatus[exec.id] = exec.data.execstatus === "active";
      });
      setToggleStatus(initialToggleStatus);
    };
    fetch();
  }, [toggleStatus]);

  const handleToggle = async (id) => {
    setToggleStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
    const executive = await getUser(id);
    const newStatus =
      executive.data.execstatus === "active" ? "inactive" : "active";
    await updateExecutiveStatus(newStatus, id);
  };

  return (
    <div className="px-6 py-10">
      <h1 className="text-4xl font-bold mb-20">Hello, Admin</h1>

      <h2 className="font-bold text-2xl mt-10 mb-4">Home Page Ads</h2>
      <Ads
        open={adsOpen}
        setOpen={setAdsOpen}
        type={null}
        rootprevious={null}
        beforeprevious={null}
        previous={null}
        home={true}
        data={ads}
      />

      <div className="py-6">
        <h2 className="text-3xl font-bold">Executives</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">S.No.</th>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Mobile</th>
              <th className="px-4 py-2 border border-gray-300">
                Executive Status
              </th>
            </tr>
          </thead>
          <tbody>
            {executives &&
              executives.map((exec, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {exec.data.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {exec.data.mobile}
                  </td>
                  <td className="px-4 flex items-center gap-x-6 py-2 border border-gray-300">
                    {toggleStatus[exec.id] ? (
                      <BsToggleOn
                        fontSize={30}
                        onClick={() => handleToggle(exec.id)}
                      />
                    ) : (
                      <BsToggleOff
                        fontSize={30}
                        onClick={() => handleToggle(exec.id)}
                      />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
