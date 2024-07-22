"use client";
import React, { useState, useEffect } from "react";
import AddNews from "./News/AddNews";
import EditNews from "./News/EditNews";
import DeleteNews from "./News/DeleteNews";
import { getNews } from "@/firebase/firestore/news";
import { Button } from "@material-tailwind/react";

function AdminNews() {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [news, setNews] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getNews();
      setNews(data);
    };
    fetch();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mt-20">Manage news</h1>
      <div className="flex justify-evenly my-6">
        <Button className="bg-kaavi mx-2" onClick={() => setAddOpen(true)}>
          Add
        </Button>
        <EditNews open={editOpen} setOpen={setEditOpen} />
        <DeleteNews open={deleteOpen} setOpen={setDeleteOpen} />
      </div>
      {addOpen && <AddNews open={addOpen} setOpen={setAddOpen} />}
    </div>
  );
}

export default AdminNews;
