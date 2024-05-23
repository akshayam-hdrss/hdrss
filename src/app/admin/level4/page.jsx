"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import auth from "@/firebase/config";
import AdminPanel4 from "@/components/AdminPanel4";
import PrivateRouter from "@/components/PrivateRouter";

export default function AdminLevel4Page() {
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
      <AdminPanel4 />
    </PrivateRouter>
  );
}
