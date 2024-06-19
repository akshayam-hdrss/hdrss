import React from 'react'
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";

function BackButton({route}) {
  return (
    <>
      <Link href={route} className="flex items-center my-4 ml-3 font-bold">
        <IoIosArrowBack />
        <p>Back</p>
      </Link>
    </>
  );
}

export default BackButton