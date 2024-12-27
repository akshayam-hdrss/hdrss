import Header from "@/components/ui/Header";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/ui/Footer";

export default function Page() {
    return (
        <div>
            <>
      <div className="fixed w-full top-0 z-[50]">
        <Header />
      </div>
      <div className="lg:grid lg:grid-cols-5 relative z-[0]">
        <Navbar />
        <div className="lg:col-span-4 lg:order-2 relative w-full pt-[70px] bg-[#FFFAF8]">
          {/* Hero Section */}

         

     
          

        
          {/* <div className="p-6 md:py-10 overflow-hidden relative z-0">
            <Image
              src="/om.svg"
              alt="om"
              width={300}
              height={300}
              className="rotate-45 opacity-[0.04] absolute right-7 -bottom-4 -z-10"
            ></Image>
            <h1 className="font-koulen text-4xl text-grey mb-2">Members</h1>
            <h2 className="text-lg text-grey font-bold">State Level Leaders</h2>
            <div className="grid md:grid-cols-4 z-50">
              {randomData && (
                <div className="p-6 flex md:grid justify-evenly gap-x-4 items-center my-2">
                  <img
                    src={randomData.data.profile}
                    alt="user profile"
                    className="w-[70px]"
                  />
                  <div>
                    <h1 className="font-medium text-xl">
                      {randomData.data.name}
                    </h1>
                    <h2 className="text-base">{randomData.data.position}</h2>
                    <p className="text-grey text-sm">
                      {randomData.data.mobile}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex z-50 justify-center items-center w-fit bg-kaavi text-white mx-auto py-2 px-4 rounded-xl">
              <Link href="/members">All members</Link>
              <IoIosArrowDown className="ml-1" />
            </div>
          </div> */}

          {/* Offers and rewards */}
          {/* <div className="px-6">
            <h1 className="font-koulen text-4xl text-grey mb-2 z-50">
              Offers and rewards
            </h1>
            <div className="flex justify-around items-center z-50 mt-2 ml-5 md:py-10">
              <Link
                href={"/games"}
                className="text-center grid gap-2 md:scale-125"
              >
                <div className="bg-[#FBE9E9] rounded-full p-4 h-20 w-20 flex justify-center items-center ">
                  <img src="/games.svg" alt="games" width={40} height={40} />
                </div>
                <h2>Games</h2>
              </Link>

              <Link
                href={"/offers"}
                className="text-center grid gap-2 md:scale-125"
              >
                <div className="bg-[#FBE9E9] rounded-full p-4 h-20 w-20 flex justify-center items-center ">
                  <img src="/offers.svg" alt="offers" width={40} height={40} />
                </div>
                <h2>Offers</h2>
              </Link>
              <Link
                href={"/charities"}
                className="text-center grid gap-2 md:scale-125"
              >
                <div className="bg-[#FBE9E9] rounded-full p-4 h-20 w-20 flex justify-center items-center ">
                  <img
                    src="/charities.svg"
                    alt="charities"
                    width={40}
                    height={40}
                  />
                </div>
                <h2>Charities</h2>
              </Link>
            </div>
            <div className="flex justify-around items-center mt-1"></div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
        </div>
    );
}