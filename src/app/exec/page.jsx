"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import { Inter, Koulen } from "next/font/google";
import auth from "@/firebase/config";
import { getUser } from "@/firebase/firestore/user";
import { onAuthStateChanged } from "firebase/auth";

const inter = Inter({ subsets: ["latin"] });

function executiveHome() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const data = await getUser(userId);
        setUserData(data);
      }
    });
  }, []);
  console.log(userData);
  return (
    <div>
      <Header exec={true} />
      <div className="p-6">
        <h1 className="font-inter font-medium text-2xl">Dashboard</h1>
        <div>
          <p>Name: {userData && userData.data.name}</p>
        </div>
      </div>
    </div>
  );
}

export default executiveHome;
