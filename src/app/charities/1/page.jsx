"use client";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import { useState } from "react";
export default function Page() {
  const [amt, setAmt] = useState("");

  const handleAmt = (amount) => {
    setAmt(amount);
  };
  return (
    <div>
      <Header />
      <BackButton />
      <div className="p-6 lg:px-20 px-8">
        <img
          src="/childcharity.png"
          alt=""
          className="w-full mx-auto max-w-[600px]"
        />
        <div className="mx-auto mt-[-80px]">
          <img
            src="/charityimg.png"
            alt=""
            className="w-[150px] rounded-full mx-auto"
          />
        </div>
        <div className="pt-5">
          <h1 className="font-semibold lg:text-3xl text-xl text-center">
            Educational Charity
          </h1>
          <h5 className="text-justify py-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
            corrupti nesciunt pariatur autem fuga iste vitae dolor culpa odit
            veritatis, sint, placeat sunt nemo. Eveniet, impedit soluta. Sunt,
            consectetur facilis? Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Doloribus blanditiis, minus consequatur nobis non
            delectus! Sit dolores aliquid assumenda in consequuntur amet
            obcaecati adipisci, excepturi perspiciatis doloremque sint
            voluptatibus nihil?
          </h5>
        </div>
        <div className="">
          <h1>Choose amount</h1>
          <div className="grid gap-3 pt-5">
            <h1
              onClick={() => handleAmt(100)}
              className={
                amt === 100
                  ? "bg-kaavi/50 rounded-md text-center py-1.5"
                  : "bg-gray-200 hover:bg-kaavi/20 rounded-md text-center py-1.5"
              }
            >
              100
            </h1>
            <h1
              onClick={() => handleAmt(200)}
              className={
                amt === 200
                  ? "bg-kaavi/50 rounded-md text-center py-1.5"
                  : "bg-gray-200 hover:bg-kaavi/20 rounded-md text-center py-1.5"
              }
            >
              500
            </h1>
            <h1
              onClick={() => handleAmt(1000)}
              className={
                amt === 1000
                  ? "bg-kaavi/50 rounded-md text-center py-1.5"
                  : "bg-gray-200 hover:bg-kaavi/20 rounded-md text-center py-1.5"
              }
            >
              1000
            </h1>
            <h1
              onClick={() => handleAmt(2000)}
              className={
                amt === 2000
                  ? "bg-kaavi/50 rounded-md text-center py-1.5"
                  : "bg-gray-200 hover:bg-kaavi/20 rounded-md text-center py-1.5"
              }
            >
              2000
            </h1>
            <h1
              onClick={() => handleAmt("custom")}
              className={
                amt === "custom"
                  ? "bg-kaavi/50 rounded-md text-center py-1.5"
                  : "bg-gray-200 hover:bg-kaavi/20 rounded-md text-center py-1.5"
              }
            >
              Custom price
            </h1>
            <h1 className="bg-kaavi text-white rounded-md text-center py-2">
              Donate
            </h1>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
