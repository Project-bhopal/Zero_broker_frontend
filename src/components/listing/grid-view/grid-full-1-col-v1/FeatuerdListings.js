"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
const FeaturedListings = ({ data, colstyle, setIsScheduleTourModal }) => {
  const router = useRouter()
  return (
    <>
      {data.map((listing) => (
        <div className="col-md-12" style={{ cursor: "pointer" }} key={listing.id} onClick={() => router?.push("/property-details/dt")}>
          <div className="listing-style1">
            <div className="list-thumb">
              <Image
                width={382}
                height={248}
                style={{ height: "370px" }}
                className="w-100  cover"
                src={listing.image}
                alt="listings"
              />
              <div className="sale-sticker-wrap">
                {!listing.forRent && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    FEATURED
                  </div>
                )}
              </div>

              <div className="list-price">
                {listing.price} / <span>mo</span>
              </div>
            </div>
            <div className="list-content">
              <div className="list-agent">
                <Image
                  width={114}
                  height={114}
                  className="rounded-circle w-full h-full cover"
                  src={listing.image}
                  alt="agent"
                />
              </div>
              <h6 className="list-title">
                <Link href={`/single-v2/${listing.id}`}>{listing.title}</Link>
              </h6>
              <div style={{ display: "flex", gap: "20px",alignItems:"center" }}>
                <p className="list-text">{listing.location}</p>
                <p
                  className="list-text"
                  style={{ display: "flex", gap: "5px", cursor: "pointer" }}
                  onClick={(e) => {
                    e?.stopPropagation();
                    setIsScheduleTourModal(true);
                  }}
                >
                  <i className="fas fa-phone-alt" style={{ fontSize: "16px" }}></i>
                  Request for call back
                </p>
                <p
                  className="list-text"
                  style={{ display: "flex", gap: "5px", cursor: "pointer" }}
                  onClick={(e) => {
                    e?.stopPropagation();
                    router.push("/pricing");
                  }}
                >
                  <i className="fas fa-eye" style={{ fontSize: "16px" }}></i>
                  View Number
                </p>
              </div>

              <div className="list-meta d-flex align-items-center">
                <a href="#">
                  <span className="flaticon-bed" /> {listing.bed} bed
                </a>
                <a href="#">
                  <span className="flaticon-shower" /> {listing.bath} bath
                </a>
                <a href="#">
                  <span className="flaticon-expand" /> {listing.sqft} sqft
                </a>
              </div>
              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span className="for-what">For Rent</span>
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
        </div >
      ))}
    </>
  );
};

export default FeaturedListings;
