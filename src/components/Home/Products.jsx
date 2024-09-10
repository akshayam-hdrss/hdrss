"use client";
import React from "react";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ServiceCard from "@/components/ui/ServiceCard";

function Products() {
  const [products, setProducts] = useState();

  console.log(products);

  useEffect(() => {
    const unsubscribe = subscribeToServicesAndProducts(
      setProducts,
      null,
      null,
      "products"
    );
    return () => unsubscribe();
  }, []);
  return (
    <div className="flex md:block justify-center relative">
      <div className="grid grid-cols-3 md:grid-cols-4  gap-5 mt-5">
        {products &&
          products
            .slice(0, 6)
            .map((item) => (
              <ServiceCard
                name={item.id}
                url={item.iconUrl}
                slug={`/products/${item.id}`}
              />
            ))}
        <Image
          src="/om.svg"
          alt="om"
          width={300}
          height={300}
          className="rotate-45 opacity-[0.04] absolute right-16 -top-28 z-[1] "
        ></Image>
      </div>
    </div>
  );
}

export default Products;
