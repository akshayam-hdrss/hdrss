import BackButton from '@/components/BackButton'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'
import React from 'react'
import { MdOutlineCall } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";

function Ramdass() {
  return (
    <div>
      <Header />
      <BackButton route="/" />
      <div className="p-6">
        <div className="flex flex-col justify-evenly items-center mb-10">
          <Image
            src="/ramdass.png"
            alt="ramdass"
            height={100}
            width={100}
          ></Image>
          <h1 className="font-bold text-lg mt-3">Ram Dass Sandilyan</h1>
          <h2 className="font-medium text-grey">HDRSS Leader</h2>
        </div>
        <p className="px-4 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac turpis
          condimentum, congue nisi ut, ullamcorper magna. Vestibulum bibendum
          maximus dui, et porta massa. Cras libero libero, egestas nec ipsum a,
          dignissim posuere tellus. Quisque tincidunt nunc tortor, at feugiat
          felis viverra sit amet. In eu lectus gravida, sagittis nisi nec,
          mollis velit. Integer congue feugiat felis vel efficitur. Nunc at
          risus tincidunt, tincidunt ipsum ut, feugiat mauris. Morbi nisl magna,
          dictum et purus vitae, pharetra sollicitudin nisi. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Nullam et enim pulvinar nibh interdum condimentum. Aliquam
          faucibus ex non semper consequat.
        </p>
        <div className='mt-10'>
                  <h1 className="font-koulen text-4xl text-grey">Socials</h1>
                  
              </div>
              <div className='mt-10'>
                  <h1 className='font-koulen text-4xl text-grey'>Contact</h1>
                  <div className='flex mb-4 mt-8 items-center justify-center'>
                      <MdOutlineCall fontSize={30} />
                      <p className='ml-3'>ramdass@gmail.com</p>
                  </div>
                  <div className='flex items-center justify-center'>
                      <MdOutlineEmail fontSize={30} />
                      <p className='ml-7'>+91 ***** *****</p>
                  </div>
              </div>
      </div>
      <Footer />
    </div>
  );
}

export default Ramdass