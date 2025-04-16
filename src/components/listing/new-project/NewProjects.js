"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
const NewProjects = ({ data, colstyle, setIsScheduleTourModal }) => {
  const router = useRouter();
  return (
    <>
      {data?.map((listing) => (
        <div
          className="col-md-12"
          style={{ cursor: "pointer" }}
          key={listing._id}
        >
          <div className="listing-style1 flex md:flex-row flex-col">
            <Link href={`/single-v1/${listing._id}`}>
              <div className="list-thumb xl:w-[500px]">
                <Image
                  width={380}
                  height={248}
                  className="w-full  cover md:h-[370px]"
                  src={listing.developer_notes.images[0]}
                  alt="listings"
                />
                <div className="list-price">
                  AED {listing.price} <span></span>
                </div>
              </div>
            </Link>
            <div className="md:p-5 p-3">
              <h6 className="fz20">
                <a
                  className="text-[#0f8363]"
                  style={{ color: "#0f8363" }}
                  href={`/single-v2/${listing._id}`}
                >
                  {listing.name}
                </a>
              </h6>
              <h6 className="text-gray-500">
                by <span className="text-[#0e6a50]">IMKAN Properties</span>
              </h6>
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
                  className="flex flex-col gap-[20px] items-center"
              >
                <p className="list-text  md:text-base text-sm text-wrap">
                 <i class="fas fa-location    "></i> {listing.location.address}
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="list-meta d-flex align-items-center gap-2 text-[#0f8363] fsz10">
                    <a className="fsz10 px-2 flex flex-col" href="#">
                      HANDOVER
                      <span className="md:text-xl text-base">
                        Q3 202{Math.floor(Math.random() * 4) + 5}
                      </span>
                    </a>
                    <a className="fsz10 px-2 flex flex-col" href="#">
                      LAUNCH PRICE
                      <span className="md:text-xl text-base">
                        AED {parseFloat((Math.random() * 5 + 5).toFixed(1))}M
                      </span>
                    </a>
                  </div>
                </div>
                <p
                  className="text-white py-2 px-16 rounded-lg bg-[#2a9075] hover:bg-[#0f8363] duration-200 text-[15px] "
                  style={{ display: "flex", gap: "5px", cursor: "pointer", fontWeight: 500 }}
                  onClick={(e) => {
                    e?.stopPropagation();
                    setIsScheduleTourModal(true);
                  }}
                >
                  Notify Me <i class="fa fa-bell" aria-hidden="true"></i> 
                </p>
              </div>
              <hr className="mt-2 mb-2" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewProjects;
