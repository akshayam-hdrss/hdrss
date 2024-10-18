"use client";
import React, { useState, useEffect } from "react";
import { getExecutive } from "@/firebase/firestore/user";
function executiveAdminPage({ params }) {
  const { id } = params;
  const [executive, setExecutive] = useState({});
  useEffect(() => {
    const fetchExecutive = async () => {
      const data = await getExecutive(id);
      setExecutive(data);
    };
    fetchExecutive();
  }, []);
  console.log(executive);
  return (
    <div>
      {executive && (
        <div>
          <h1>{executive.data?.name}</h1>
        </div>
      )}
    </div>
  );
}

export default executiveAdminPage;
