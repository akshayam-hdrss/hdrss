"use client";
import ExecutiveGaurd from "@/components/Executive/ExecutiveGaurd";
import auth from "@/firebase/config";
import { getUser } from "@/firebase/firestore/user";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

function executiveLayout({ children }) {
  const [executive, setExecutive] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const data = await getUser(userId);
        setUserData(data);
        if (
          data &&
          data.data.executive === true &&
          data.data.execstatus === "active"
        ) {
          setExecutive(user);
        } else {
          setExecutive(null);
        }
      } else {
        setExecutive(null);
      }
    });
  }, []);

  if (!executive) return <ExecutiveGaurd />;
  return <div>executiveLayout</div>;
}

export default executiveLayout;
