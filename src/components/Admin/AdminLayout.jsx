"use client";
import AdminGaurd from "@/components/Admin/AdminGaurd";
import auth from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

function AdminLayout({ children }) {
  const [admin, setAdmin] = useState();
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const adminEmail = "hdrss.in@gmail.com";
        setAdmin(user.email === adminEmail);
      } else {
        setAdmin(null);
      }
    });
  });
  if (!admin) return <AdminGaurd />;
  return <> {children} </>;
}

export default AdminLayout;
