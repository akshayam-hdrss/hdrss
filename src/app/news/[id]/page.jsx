import React from "react";
import { getNews } from "@/firebase/firestore/news";
export async function generateStaticParams() {
  const result = await getNews();
  return result.map((doc) => ({
    id: doc.id,
  }));
}

function newsPage({ params }) {
  const { id } = params;
  return <div>{id}</div>;
}

export default newsPage;
