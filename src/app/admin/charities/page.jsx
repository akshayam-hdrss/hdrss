"use client";
import React, { useState } from "react";
import AddCharity from "@/components/Admin/Charities/AddCharity";
function charitiesPage() {
  const [addOpen, setAddOpen] = useState(false);
  return (
    <div className="p-6">
      <h1 className="font-bold text-4xl">Charities</h1>
      <AddCharity open={addOpen} setOpen={setAddOpen} />
    </div>
  );
}

export default charitiesPage;
