"use client";
import React, { useState, useEffect, useRef } from "react";
import { getServiceAndProductDocs } from "@/firebase/firestore/servicesProducts";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { formatDistanceToNow } from "date-fns";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import GalleryCarousel from "@/components/ui/GalleryCarousel";
import UserAuth from "../UserAuth";
import AddReview from "../AddReview";
import auth from "@/firebase/config.js";
import { app } from "@/firebase/config";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getReviews } from "@/firebase/firestore/reviews";
const db = getFirestore(app);

function ServiceLevel4({ id, secondid, thirdid, fourthid }) {
  const [data, setData] = useState();
  const [reviewsOpen, setReviewsOpen] = useState();
  const user = UserAuth();
  const [reviews, setReviews] = useState();
  const [checkReview, setCheckReview] = useState();

  useEffect(() => {
    const fetch = async () => {
      const data = await getServiceAndProductDocs(
        id,
        secondid,
        thirdid,
        fourthid,
        "services"
      );
      const data2 = await getReviews();
      setReviews(data2);
      setData(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = () => {
      if (user) {
        const data1 =
          reviews && reviews.filter((item) => item.userId === user.uid);
        setCheckReview(data1);
      }
    };
    fetch();
  }, [user, reviews]);

  return (
    <div>
      <Header />
      <BackButton />
      {data && (
        <div className="p-6">
          <div className="flex flex-col items-center text-center justify-evenly py-6">
            <div className="w-[130px] h-fit">
              <img
                src={data.profile}
                alt="profile"
                className="rounded-md object-cover aspect-[4/5]"
              />
            </div>
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
          <div className="py-20">
            <div className="flex justify-between items-center">
              <h1 className="font-koulen text-3xl text-grey mr-20">Reviews</h1>

              {!user ? (
                <a
                  href="/login"
                  className="bg-kaavi text-white px-4 py-2 rounded-md"
                >
                  Login to add review
                </a>
              ) : checkReview && checkReview.length < 1 ? (
                <AddReview
                  open={reviewsOpen}
                  setOpen={setReviewsOpen}
                  user={user}
                  id={id}
                  secondid={secondid}
                  thirdid={thirdid}
                  fourthid={fourthid}
                  type={"services"}
                />
              ) : (
                <p className="bg-green-600 text-white px-4 py-2 rounded-lg flex justify-between items-center gap-x-2">
                  Review added <IoIosCheckmarkCircle />
                </p>
              )}
            </div>
            <div
              className="flex flex-row overflow-x-scroll pt-12 nosc"
            >
              {reviews &&
                reviews.map((doc, index) => (
                  <div
                    className="min-w-[86vw] mx-10 first:ml-0 rounded-md px-6 py-6 overflow-clip border border-grey"
                    key={index}
                  >
                    <p className="text-grey font-medium">{doc.userName}</p>
                    <p className="py-4 break-words text-justify">
                      {doc.review}
                    </p>
                    <p className="font-medium text-grey">
                      {formatDistanceToNow(
                        new Date(doc.timestamp.seconds * 1000)
                      )}{" "}
                      ago
                    </p>
                  </div>
                ))}
            </div>
          </div>
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
      )}

      <Footer />
    </div>
  );
}

export default ServiceLevel4;
