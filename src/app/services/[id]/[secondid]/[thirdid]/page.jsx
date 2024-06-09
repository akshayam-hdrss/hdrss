import React from "react";
import { getServicesDocs, getServicesList } from "@/firebase/firestore/getData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export async function generateStaticParams() {
  const list = await getServicesList(null, null);
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesList(null, null, item);
      const subPaths = await Promise.all(
        list2.map(async (subitem) => {
          const list3 = await getServicesList(null, item, subitem);
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
  const data = await getServicesDocs(id, secondid, thirdid, null);
  console.log(data);
  const capitalized = thirdid.charAt(0).toUpperCase() + thirdid.slice(1);
  return (
    <div>
      <Header />
      <BackButton route={`/services/${id}/${secondid}`} />
      <div>
        <h1 className="font-bold text-2xl pb-20 p-6">{capitalized}</h1>

        {data &&
          data.map((item) => (
            <Link
              href={`/services/${id}/${secondid}/${thirdid}/${item.id}`}
              key={item.id}
              className="flex justify-evenly items-center border-b border-grey pb-10 px-0 mb-5 mx-0"
            >
              <img src={item.data.profile} alt="Profile" />
              <div className="flex flex-col justify-between items-center">
                <h1 className="font-bold text-xl">{item.data.name}</h1>
                <h2 className="font-medium text-grey mb-0 pb-0">
                  {item.data.location}
                </h2>
                <p className="font-medium text-grey mt-0 pt-0">
                  {item.data.district}
                </p>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default ServiceLevel3Page;
