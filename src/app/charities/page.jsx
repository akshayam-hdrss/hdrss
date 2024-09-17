"use client";
import { useState } from "react";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
export default function Page() {
  return (
    <div>
      <Header />
      <BackButton />
      <div className="p-6">
        <h1 className="font-koulen text-grey text-4xl">Charities</h1>
      </div>
      <Footer />
    </div>
  );
}
