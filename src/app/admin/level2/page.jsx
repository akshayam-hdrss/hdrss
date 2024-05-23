"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import auth from "@/firebase/config";
import AdminPanel2 from "@/components/AdminPanel2";
import PrivateRouter from "@/components/PrivateRouter";

export default function AdminLevel2Page() {
  const router = useRouter();
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // If the user is not authenticated, redirect to the admin login page
        router.replace("/admin/login");
      }
    });
  });

  return (
    <PrivateRouter>
      <AdminPanel2 />
    </PrivateRouter>
  );
}
