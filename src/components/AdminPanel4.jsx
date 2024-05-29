"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import AddServiceDocPopup from "./AddServiceDocPopup";

function AdminPanel4() {
  const [hidden, setHidden] = useState(false)
  const searchparam = useSearchParams();
  const previous = searchparam.get("previous");
  const beforeprevious = searchparam.get("beforeprevious");
  const rootprevious = searchparam.get("rootprevious");
  const type = searchparam.get("type");
  const handleClick = () => {
    setHidden(!hidden);
  }
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold pb-20">{previous}</h1>
      <button className="bg-kaavi p-3 rounded-lg text-white" onClick={handleClick}>Add new {previous}</button>
      <AddServiceDocPopup hidden={hidden} setHidden={setHidden} />
    </div>
  );
}

export default AdminPanel4;
