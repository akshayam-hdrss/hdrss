"use client";
import { useState } from "react";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
export default function Page() {
  const [isCopied, setIsCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard
      .writeText("https://hdrss.in")
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div>
      <Header />
      <main>
        <BackButton />
        <div className="px-10">
          <div className="flex justify-center">
            <img src="/refer.png" alt="" className="w-[200px]" />
          </div>
          <div className="py-5 grid gap-3">
            <h1 className="font-koulen text-grey text-3xl text-center">
              REFER & EARN
            </h1>
            <h3>
              Share our website with your friend while signing up and you both
              will get bonus offers.
            </h3>
            <div className="px-5 py-5">
              <div className="grid grid-cols-3 rounded-xl">
                <div className="col-span-2 bg-gray-200 p-3 text-center rounded-l-md">
                  <h1>HDRSS.in</h1>
                </div>
                <button
                  onClick={copyLink}
                  className="bg-red-400 text-white px-1 text-center rounded-r-md"
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>
              {/* <div className="flex justify-around pt-10">
                <div className="">
                  <img src="/wplogo.png" alt="" className="w-[40px]" />
                </div>
                <div className="">
                  <img src="/fblogo.png" alt="" className="w-[40px]" />
                </div>
                <div className="">
                  <img src="/inlogo.png" alt="" className="w-[40px]" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
