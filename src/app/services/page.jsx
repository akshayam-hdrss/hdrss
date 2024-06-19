import React from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Level1Services from "@/components/ui/Level1Services";
import BackButton from "@/components/ui/BackButton";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";

function Services() {
  return (
    <div>
      <Header />
      <BackButton route="/" />
      <YoutubeEmbed href="#" />
      <div className="mt-12 p-6">
        <h1 className="font-koulen uppercase text-4xl text-grey">services</h1>
        <div className="grid grid-cols-3 gap-y-10 gap-x-10 mt-8">
          <Level1Services />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
