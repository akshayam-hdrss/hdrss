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
    const unsubscribe = () => {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push("/login");
        }
      });
    };
    return () => unsubscribe();
  }, []);

  return (
    <PrivateRouter>
      <AdminPanel />
    </PrivateRouter>
  );
}

export default AdminPage;
