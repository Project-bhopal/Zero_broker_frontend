"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
const FeaturedListings = ({ data, colstyle, setIsScheduleTourModal }) => {
  const router = useRouter();
  return (
    <>
      {data.map((listing) => (
        <div
          className="col-md-12"
          style={{ cursor: "pointer" }}
          key={listing._id}
        >
          <div className="listing-style1">
            <Link href={`/single-v1/${listing._id}`}>
              <div className="list-thumb md:h-[370px] w-full">
                <Image
                  width={382}
                  height={208}
                  className="cover h-full w-full"
                  src={listing.developer_notes.images[0]}
                  alt="listings"
                />
                <div className="sale-sticker-wrap">
                  {listing.details.purpose == "Sell" && (
                    <div className="list-tag fz12">
                      <span className="flaticon-electricity me-2" />
                      FEATURED
                    </div>
                  )}
                </div>

                <div className="list-price md:text-[18px] text-[12px]">
                  AED {listing.price} <span></span>
                </div>
              </div>
            </Link>
            <div className="list-content">
              <div className="list-agent">
                <Image
                  width={114}
                  height={114}
                  className="rounded-full md:w-[100px] w-[80px] md:h-[100px] h-[80px] object-cover"
                  src={listing.developer_notes.images[1]}
                  alt="agent"
                />
              </div>
              <h6 className="fz18">
                <a
                  className="text-[#0f8363]"
                  style={{ color: "#0f8363" }}
                  href={`/single-v2/${listing._id}`}
                >
                  {listing.name}
                </a>
              </h6>
              <div className="flex md:flex-row flex-col md:gap-[20px] gap-[10px] items-center">
                <p className="list-text w-[300px]">
                  {listing.location.address}
                </p>
                <div className="flex gap-1 ">
                  <p
                    className="text-white text-center lg:text-[16px] text-[12px] cursor-pointer flex justify-center items-center gap-[5px] md:py-2 py-1 px-3 rounded-lg bg-[#2a9075] hover:bg-[#0f8363] duration-200 "
                    style={{ fontWeight: 500 }}
                    onClick={(e) => {
                      e?.stopPropagation();
                      setIsScheduleTourModal(true);
                    }}
                  >
                    <i
                      className="fas fa-phone-alt lg:text-[15px] text-[12px]"
                    ></i>
                    Request Call Back
                  </p>
                  <p
                    className="text-white text-center lg:text-[16px] text-[12px] flex justify-center items-center md:gap-[5px] gap-[2px] cursor-pointer md:py-2 py-1 md:px-3 px-2 rounded-lg bg-[#2a9075] hover:bg-[#0f8363] duration-200 "
                    style={{
                      fontWeight: 500,
                    }}
                    onClick={(e) => {
                      e?.stopPropagation();
                      router.push("/pricing");
                    }}
                  >
                    <i className="fas fa-eye lg:text-[15px] text-[12px]"></i>
                    View Number
                  </p>
                </div>
              </div>

              <div className="list-meta d-flex align-items-center gap-2 text-[#0f8363] fsz10">
                <a className="fsz10" href="#">
                  <span className="flaticon-bed" /> {listing.details.bedrooms}{" "}
                  bed
                </a>
                <a href="#">
                  <span className="flaticon-shower" />{" "}
                  {listing.details.bathrooms} bath
                </a>
                <a href="#">
                  <span className="flaticon-expand" />{" "}
                  {listing.details.size.value} sqft
                </a>
              </div>
              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span className="for-what">For {listing.details.purpose}</span>
                <div className="icons d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-fullscreen" />
                  </a>
                  <a href="#">
                    <span className="flaticon-new-tab" />
                  </a>
                  <a href="#">
                    <span className="flaticon-like" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
