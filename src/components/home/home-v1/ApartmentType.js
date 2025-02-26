"use client";
import { pageRoutes } from "@/utilis/common";
import Link from "next/link";
import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const ApartmentType = () => {

  const apartmentType= [
    { id: 1, icon: "flaticon-home", url:"/house-type/properties", title: "Houses", count: 22 },
    { id: 2, icon: "flaticon-corporation", url:"/apartments-type/properties", title: "Apartments", count: 22 },
    { id: 3, icon: "flaticon-network", url:"/office-type/properties", title: "Office", count: 22 },
    { id: 4, icon: "flaticon-garden", url:"/villa-type/properties", title: "Villa", count: 22 },
    { id: 5, icon: "flaticon-chat", url:"/townhome-type/properties", title: "Townhome", count: 22 },
    { id: 6, icon: "flaticon-window", url:"/bungalow-type/properties", title: "Bungalow", count: 22 },
    { id: 7, icon: "flaticon-bird-house", url:"/loft-type/properties", title: "Loft", count: 22 },
  ];
  return (
    <Swiper
      className="overflow-visible"
      spaceBetween={30}
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: ".next__active",
        prevEl: ".prev__active",
      }}
      pagination={{
        el: ".pagination__active",
        clickable: true,
      }}
      breakpoints={{
        300: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      }}
    >
      {apartmentType.map((type) => (
        <SwiperSlide key={type.id}>
          <div className="item">
            <Link href={type.url}>
              <div className="iconbox-style1">
                <span className={`icon ${type.icon}`} />
                <div className="iconbox-content">
                  <h6 className="title">{type.title}</h6>
                  <p className="text mb-0">{`${type.count} Properties`}</p>
                </div>
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ApartmentType;
