import React, { Suspense } from "react";
import {
  getServiceAndProductDocs,
  getServicesAndProductsList,
} from "@/firebase/firestore/servicesProducts";
import ProductsLevel2 from "@/components/Products/ProductsLevel2";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "products");
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesAndProductsList(
        null,
        null,
        item,
        "products"
      );
      return list2.map((subitem) => ({
        id: item,
        secondid: subitem,
      }));
    })
  );
  // Flatten the array of arrays into a single array of objects
  return paths.flat();
}

async function ProductLevel2Page({ params }) {
  const { id, secondid } = params;
  const data = await getServiceAndProductDocs(
    null,
    id,
    secondid,
    null,
    "products"
  );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsLevel2 data={data} id={id} secondid={secondid} />
    </Suspense>
  );
}

export default ProductLevel2Page;
