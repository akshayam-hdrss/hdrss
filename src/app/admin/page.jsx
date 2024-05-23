"use client";
import React from "react";
import { useEffect } from "react";
import PrivateRouter from "@/components/PrivateRouter";
import AdminPanel from "@/components/AdminPanel";
import auth from "@/firebase/config";
import { useRouter } from "next/navigation";
function AdminPage() {
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
      <AdminPanel />
    </PrivateRouter>
  );
}

export default AdminPage;
