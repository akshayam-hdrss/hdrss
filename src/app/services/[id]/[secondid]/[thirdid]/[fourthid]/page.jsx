import React from "react";
import {
  getServiceAndProductDocs,
  getServicesAndProductsList,
} from "@/firebase/firestore/servicesProducts";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import GalleryCarousel from "@/components/ui/GalleryCarousel";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "services");
  const paths = await Promise.all(
    list?.map(async (item) => {
      const list2 = await getServicesAndProductsList(
        null,
        null,
        item,
        "services"
      );
      const subPaths = await Promise.all(
        list2?.map(async (subitem) => {
          const list3 = await getServicesAndProductsList(
            null,
            item,
            subitem,
            "services"
          );
          console.log("list3:", list3);
          const subsubPaths = await Promise.all(
            list3?.map(async (subitem2) => {
              const list4 = await getServicesAndProductsList(
                item,
                subitem,
                subitem2,
                "services"
              );
              return list4?.map((subitem3) => ({
                id: item,
                secondid: subitem,
                thirdid: subitem2,
                fourthid: subitem3,
              }));
            })
          );
          return subsubPaths?.flat();
        })
      );
      return subPaths?.flat();
    })
  );
  return paths?.flat();
}

export default async function ServiceLevel4Page({ params }) {
  const { id, secondid, thirdid, fourthid } = params;
  const data = await getServiceAndProductDocs(
    id,
    secondid,
    thirdid,
    fourthid,
    "services"
  );
  return (
    <div>
      <Header />
      <BackButton route="/" />
      <div className="p-6">
        <div className="flex flex-col items-center justify-evenly py-6">
          <img src={data.profile} alt="profile" />
          <h1 className="font-bold text-3xl pt-6">{data.name}</h1>
          <p className="text-grey font-medium">{data.addline1}</p>
          <p className="text-grey font-medium">{data.addline2}</p>
          <p className="text-grey font-medium">{data.area}</p>
          <p className="text-grey font-medium">{data.landmark}</p>
          <p className="text-grey font-medium">{data.district}</p>
          <p className="text-grey font-medium">{data.pincode}</p>
          <div className="my-4">
            <a
              href={`tel:${data.mobile}`}
              className="my-6 mr-2 font-medium bg-kaavi text-white rounded-lg p-3 px-4"
            >
              Contact
            </a>
            <a
              href={`https://wa.me/${data.whatsapp}`}
              className="my-6 font-medium bg-green-600 text-white rounded-lg p-3 px-4"
            >
              Whatsapp
            </a>
          </div>
        </div>

        <h1 className="font-koulen text-3xl text-grey pb-4">About</h1>
        <p className="px-4 text-justify">{data.about}</p>

        <h1 className="font-koulen text-3xl pt-10 text-grey">Gallery</h1>
        {data.photos && <GalleryCarousel data={data.photos} />}

        <h1 className="font-koulen text-3xl pt-10 text-grey">Reviews</h1>
        <div>
          <h1 className="font-koulen text-3xl pt-10 text-grey">
            Google Maps Link
          </h1>
          <a
            className="bg-kaavi px-4 py-2 text-white rounded-md text-center my-10 mx-auto block w-fit"
            href={data.mapurl}
          >
            Maps Link
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
