"use client";
import React from "react";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { useState, useEffect } from "react";

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
    <div className="grid grid-cols-2 gap-y-10 gap-x-10 mt-8">
      {products &&
        products.map((item) => (
          <a href={`/products/${item.id}`} className="h-40 relative rounded-xl drop-shadow-xl">
            <img
              src={item.iconUrl}
              alt=""
              className="object-cover w-full h-full rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-w-b from-white to-black opacity-60 h-full w-full rounded-xl"></div>
          
              <h1 className="font-bold capitalize absolute bottom-4 text-xl left-2 text-white bg-kaavi px-1 rounded-md">
                {item.id}
              </h1>
            
          </a>
        ))}
    </div>
  );
}

export default Products;
