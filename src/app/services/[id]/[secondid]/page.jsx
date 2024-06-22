import React from "react";
import {
  getServicesAndProductsList,
  getServiceAndProductDocs,
} from "@/firebase/firestore/servicesProducts";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null,"services");
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesAndProductsList(null, null, item,"services");
      return list2.map((subitem) => ({
        id: item,
        secondid: subitem,
      }));
    })
  );
  // Flatten the array of arrays into a single array of objects
  return paths.flat();
}

async function ServiceLevel2Page({ params }) {
  const { id, secondid } = params;
  const data = await getServiceAndProductDocs(null, id, secondid,null,"services");
  const capitalized = secondid.charAt(0).toUpperCase() + secondid.slice(1);
  return (
    <div>
      <Header />
      <BackButton route={`/services/${id}/`} />
      <YoutubeEmbed embedId="#" />
      <div className="p-6 py-20">
        <h1 className="font-bold text-3xl text-center pb-20">{capitalized}</h1>
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 items-center justify-center">
          {data.map((doc) => (
            <Link
              href={`/services/${id}/${secondid}/${doc.id}`}
              className="flex items-center justify-center bg-[#F4F5F5] rounded-xl h-20 p-6 px-3"
            >
              <div className="w-1/3 h-fit mr-3">
                <img
                  src={doc.data.iconUrl}
                  alt="Icon"
                  className="object-scale-down aspect-square"
                />
              </div>
              <h1 className="w-2/3 mr-0">{doc.data.name}</h1>
            </Link>
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId="#" />
      <Footer />
    </div>
  );
}

export default ServiceLevel2Page;
