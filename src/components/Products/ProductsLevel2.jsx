"use client";
import React, { useState, useEffect } from "react";
import { getProductDocs } from "@/firebase/firestore/products";
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
import { formatDistanceToNow } from "date-fns";

const db = getFirestore(app);
function ProductsLevel2({ id, secondid }) {
  const [data, setData] = useState();
  const [reviewsOpen, setReviewsOpen] = useState();
  const user = UserAuth();
  const [reviews, setReviews] = useState();
  const [checkReview, setCheckReview] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await getProductDocs(id, secondid);
      setData(res);
      const data2 = await getReviews();
      setReviews(data2);
    };
    fetch();
  });
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
        <div>
          <div className="w-full">
            <img
              src={data.background}
              alt="background image"
              className="w-full"
            />
          </div>
          <div className="p-6 pt-0">
            <div className="flex flex-col items-center justify-evenly py-6">
              <div className="w-[130px] h-fit -mt-[80px] ml-[26vw]">
                <img
                  src={data.profile}
                  alt="profile"
                  className="rounded-md object-cover aspect-[4/5]"
                />
              </div>
              <h1 className="font-bold text-3xl pt-6">{data.name}</h1>
              <p className="text-grey font-medium">₹{data.price}</p>
              <div className="my-4">
                <a
                  href={`tel:${data.mobile}`}
                  className="my-6 mr-2 font-medium bg-kaavi text-white rounded-lg p-3 px-4"
                >
                  Contact
                </a>
              </div>
            </div>
            <h1 className="font-koulen text-3xl text-grey pb-4">About</h1>
            <p className="px-4 text-justify">{data.about}</p>

            <h1 className="font-koulen text-3xl pt-10 text-grey">Gallery</h1>
            {data.photos && <GalleryCarousel data={data.photos} />}
            <div>
              <h1 className="font-koulen text-3xl pt-10 text-grey">Reviews</h1>
              <div className="flex justify-between items-center">
                <h1 className="font-koulen text-3xl text-grey mr-20">
                  Reviews
                </h1>

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
                    type={"products"}
                  />
                ) : (
                  <p className="bg-green-600 text-white px-4 py-2 rounded-lg flex justify-between items-center gap-x-2">
                    Review added <IoIosCheckmarkCircle />
                  </p>
                )}
              </div>
              <div className="flex flex-row overflow-x-scroll pt-12 nosc">
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
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ProductsLevel2;
