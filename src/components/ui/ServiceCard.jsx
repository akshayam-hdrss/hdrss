import React from "react";
import Image from "next/image";
import Link from "next/link";
function ServiceCard({ name, url, slug }) {
  return (
    <Link href={slug} className="bg-gradient-to-b m-auto from-[#FCEDED] to-[#F6F6F6] text-center flex flex-col justify-center items-center w-[100px] h-[100px] bg-white border-2 border-solid border-[#909090] rounded-2xl cursor-pointer">
      <img src={url} alt={name} width={40} height={40} />
      <p className="font-medium text-md capitalize mt-1 whitespace-pre-wrap">
        {name}
      </p>
    </Link>
  );
}

export default ServiceCard;
