import React from "react";
import {
  getServiceAndProductDocs,
  getServicesAndProductsList,
  getName,
} from "@/firebase/firestore/servicesProducts";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import BackButton from "@/components/ui/BackButton";
import { getYt } from "@/firebase/firestore/servicesyt";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import Advertisement from "@/components/ui/Advertisement";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "services");
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesAndProductsList(
        null,
        null,
        item,
        "services"
      );
      const subPaths = await Promise.all(
        list2.map(async (subitem) => {
          const list3 = await getServicesAndProductsList(
            null,
            item,
            subitem,
            "services"
          );
          return list3.map((subitem2) => ({
            id: item,
            secondid: subitem,
            thirdid: subitem2,
          }));
        })
      );
      return subPaths.flat();
    })
  );
  return paths.flat();
}

async function ServiceLevel3Page({ params }) {
  const { id, secondid, thirdid } = params;
  const decodedfirst = decodeURIComponent(id);
  const decodedsecond = decodeURIComponent(secondid);
  const decodedthird = decodeURIComponent(thirdid);

  const data = await getServiceAndProductDocs(
    decodedfirst,
    decodedsecond,
    decodedthird,
    null,
    "services"
  );
  const capitalized = await getName(decodedfirst, decodedsecond, decodedthird);
  const link = await getYt(
    "services",
    decodedfirst,
    decodedsecond,
    decodedthird
  );
  const ads = await getServiceAds(
    "services",
    decodedfirst,
    decodedsecond,
    decodedthird,
    null
  );
  return (
    <div>
      <Header />
      <BackButton route={`/services/${id}/${secondid}`} />
      <Advertisement ads={ads} />
      <div>
        <h1 className="font-bold text-2xl pb-20 p-6">{capitalized}</h1>

        {data &&
          data.map((item) => (
            <Link
              href={`/services/${id}/${secondid}/${thirdid}/${item.id}`}
              key={item.id}
              className="flex justify-center px-6 items-start border-b border-grey pb-3 mb-5 mx-0"
            >
              <div className="w-[30%] h-10">
                <img
                  src={item.data.profile}
                  alt="Profile"
                  className="aspect-[1/2] object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-between items-center w-[70%]">
                <h1 className="font-bold text-3xl">{item.data.name}</h1>
                <h2 className="text-lg font-medium">
                  {item.data.businessname}
                </h2>

                <p className="font-medium text-grey mt-0 pt-0">
                  {item.data.area}
                </p>
              </div>
            </Link>
          ))}
      </div>
      <YoutubeEmbed embedId={link} />
      <Footer />
    </div>
  );
}

export default ServiceLevel3Page;
