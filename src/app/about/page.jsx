import Header from "@/components/ui/Header";
import Navbar from "@/components/Navbar";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Marquee from "react-fast-marquee";

export default function Page() {
  return (
    <div>
      <Header />
      <main>
        <div className="lg:grid grid-cols-5 relative z-[0]">
          <div className="">
            <Navbar />
          </div>
          <div className="col-span-4 ">
            <img src="/membermd.png" alt="" className="w-full" />
            <div className="flex justify-center w-full mt-[-100px] ">
              <div className="p-3 rounded-full shadow-2xl bg-white">
                <img
                  src="/orangelogo.png"
                  alt=""
                  className="w-[160px] md:w-[200px]"
                />
              </div>
            </div>
            <div className="lg:px-20 px-10">
              <div className="font-semibold text-xl text-center pt-5 grid gap-1">
                <h1>இந்து தர்ம ரக்‌ஷ சேனா</h1>
                <h1>Hindhu Dharma Raksha Sena</h1>
              </div>
              <div className="flex justify-center gap-5 text-3xl text-kaavi py-5 items-center">
                <IoLogoWhatsapp />
                <FaFacebook />
                <FaPhoneAlt />
              </div>
              <div className="">
                <h1 className="font-koulen text-4xl text-grey ">ABOUT US</h1>
                <h5 className="pt-5 text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolorem esse molestias numquam, dolore provident id quas
                  obcaecati, tenetur cum nisi distinctio iste ipsam voluptatum
                  nostrum nam pariatur non eaque minus. lorem\ Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Unde odio sit,
                  recusandae facere laudantium cum quidem voluptas hic pariatur
                  non sapiente dolore eaque accusamus possimus perferendis culpa
                  rerum sunt velit! Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Labore tenetur quae eius soluta eveniet!
                  Inventore, repellendus, soluta a ut tempora minus veritatis
                  reiciendis dolorem iste explicabo cum vel animi expedita.
                </h5>
              </div>
              <div className="py-5">
                <h1 className="font-koulen text-4xl text-grey ">GALLERY</h1>
                <div className="py-5">
                  <section className=" overflow-hidden w-full text-center">
                    <Marquee pauseOnClick pauseOnHover>
                        <img src="/ac1.jpeg" alt="" className="h-[200px] mx-2" />
                        <img src="/ac2.jpg" alt="" className="h-[200px] mx-2" />
                        <img src="/ac3.jpg" alt="" className="h-[200px] mx-2" />
                    </Marquee>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
