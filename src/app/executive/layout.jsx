"use client";
import ExecutiveGaurd from "@/components/Executive/ExecutiveGaurd";
import auth from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

function executiveLayout({ children }) {
    const [executive, setExecutive] = useState();
    useEffect(() => {
      return onAuthStateChanged(auth, (user) => {
        if (user) {
          
          setExecutive(user.email === adminEmail);
        } else {
          setExecutive(null);
        }
      });
    });
  return <div>executiveLayout</div>;
}

export default executiveLayout;
