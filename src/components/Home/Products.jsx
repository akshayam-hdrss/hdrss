"use client";
import React from "react";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { useState, useEffect } from "react";
import Link from "next/link";

function Products() {
  const [products, setProducts] = useState();

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
    <div className="grid grid-cols-2  gap-5 mt-8 p-5">
      {products &&
        products.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.id}`}
            className="h-36 relative rounded-xl drop-shadow-xl"
          >
            <img
              src={item.iconUrl}
              alt=""
              className="object-cover w-full h-full rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-w-b from-white to-black opacity-60 h-full w-full rounded-xl"></div>

            <div className="flex justify-center">
              <h1 className="font-bold capitalize mt-[-40px] h-fit z-[2] text-xl left-2 text-white bg-kaavi px-1 rounded-md">
                {item.id}
              </h1>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Products;
