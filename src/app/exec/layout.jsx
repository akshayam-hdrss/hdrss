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
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        if (userData && userData.status === "active") {
          setExecutive(user);
        } else {
          setExecutive(null);
        }
      } else {
        setExecutive(null);
      }
    });
  });

  useEffect(() => {
    const fetch = async () => {
      const data = await getUser(user.uid);
      setUserData(data);
    };
    fetch();
  });
  if (!executive) return <ExecutiveGaurd />;
  return <div>executiveLayout</div>;
}

export default executiveLayout;
