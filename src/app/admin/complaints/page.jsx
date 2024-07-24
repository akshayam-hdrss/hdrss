import { getComplaints } from "@/firebase/firestore/complaints";
import React from "react";

async function page() {
  const complaints = await getComplaints();
  console.log(complaints);
  return (
    <div>
      <h1 className="text-4xl font-bold">Complaints</h1>
      <h2 className="mt-6 font-medium text-2xl">
        Number of complaints: {complaints.length}
      </h2>
      {complaints.map((complaint, index) => (
        <div className="border border-grey my-6 w-max mx-auto p-6">
          <h1 className="font-bold">Subject</h1>
          <h1>{complaint.data.subject}</h1>
          <h1 className="font-bold">Description</h1>
          <p>{complaint.data.description}</p>
          <h1 className="font-bold">Location</h1>
          <p>{complaint.data.location}</p>
        </div>
      ))}
    </div>
  );
}

export default page;
