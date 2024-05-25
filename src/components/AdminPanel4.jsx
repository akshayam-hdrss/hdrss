"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

function AdminPanel4() {
  const searchparam = useSearchParams();
  const previous = searchparam.get("previous");
  const beforeprevious = searchparam.get("beforeprevious");
  const rootprevious = searchparam.get("rootprevious");

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold pb-20">{previous}</h1>
      <form action="submit">
        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Name"
            className="border border-black pl-4 "
          />
        </div>
      </form>
    </div>
  );
}

export default AdminPanel4;
