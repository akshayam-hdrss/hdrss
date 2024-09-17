"use client";
import { useState } from "react";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import CharityCard from "../../components/ui/CharityCard";
export default function Page() {
  return (
    <div>
      <Header />
      <BackButton />
      <div className="p-6 lg:px-20 px-8">
        <h1 className="font-koulen text-grey text-4xl">Charities</h1>
        <div className="py-5 grid lg:grid-cols-2 gap-5 ">
        <CharityCard image={"/charityimg.png"} name={"Educational Charity"} description={"Lorem ipsum dolor, sit amet consecteturtus, molestiae nihil aliquid ellat assumenda nemo."}  />
        <CharityCard image={"/charityimg.png"} name={"Educational Charity"} description={"Lorem ipsum dolor, sit amet consecteturtus, molestiae nihil aliquid ellat assumenda nemo."}  />
        <CharityCard image={"/charityimg.png"} name={"Educational Charity"} description={"Lorem ipsum dolor, sit amet consecteturtus, molestiae nihil aliquid ellat assumenda nemo."}  />
        <CharityCard image={"/charityimg.png"} name={"Educational Charity"} description={"Lorem ipsum dolor, sit amet consecteturtus, molestiae nihil aliquid ellat assumenda nemo."}  />
      </div>
      </div>
      
      <Footer />
    </div>
  );
}
