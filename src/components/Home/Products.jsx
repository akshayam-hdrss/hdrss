"use client";
import React from "react";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { useState, useEffect } from "react";
import Link from "next/link";

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
    <div className="flex md:block justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4  gap-5 mt-8">
      {products &&
        products.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.id}`}
            className=" relative "
          >
            <div className="h-36 w-36 border border-black rounded-2xl bg-gradient-to-br from-white to-black/40 mx-auto">
              <img
                src={item.iconUrl}
                alt="product"
                className="object-contain w-full h-full rounded-2xl object-center "
              />
            </div>

            <div className="flex justify-center relative pt-5">
              <h1 className="font-semibold capitalize z-[2] text-2xl text-black">
                {item.id}
              </h1>
            </div>
          </Link>
        ))}
    </div>
    </div>
  );
}

export default Products;
