"use client";
import Image from "next/image";
import React, { useState } from "react";

const TenantPricing = () => {
  const pricingPackages = [
    {
      packageTitle: "Basic",
      price: "1500 AED",
      priceIcon: "images/icon/pricing-icon-2.svg",
      features: [
        "No Expiry of Plan",
        "Contact Upto 10",
        "Ejari Assistance",
        "Documents Processing",
        "24/7 Full support",
      ],
    },
    {
      packageTitle: "Intermediate ",
      price: "2000 AED",
      priceIcon: "images/icon/pricing-icon-1.svg",
      uniqueClass: "unique-class", // Add a unique class for Professional package
      features: [
        "No Expiry of Plan",
        "Contact Upto 20",
        "Ejari Assistance",
        "Documentation",
        "Dedicated expert help",
        "Viewing assistance",
        "24/7 Full support",
      ],
    },
    {
      packageTitle: "Dedicated Expert ",
      price: "2500 AED",
      priceIcon: "images/icon/pricing-icon-3.svg",
      features: [
       "No Expiry of Plan",
        "Contact Unlimited",
        "Ejari Assistance",
        "Documentation",
        "Dedicated expert help",
        "Viewing assistance",
        "Site visit assistance",
        "24/7 Full support",
      ],
    },
  ];

  const [isYearlyBilling, setIsYearlyBilling] = useState(false);

  const handleBillingToggle = () => {
    setIsYearlyBilling((prevIsYearlyBilling) => !prevIsYearlyBilling);
  };

  return (
    <>
      {/* <div className="row" data-aos="fade-up" data-aos-delay="200">
        <div className="col-lg-12">
          <div className="pricing_packages_top d-flex align-items-center justify-content-center mb60">
            <div className="toggle-btn">
              <span className="pricing_save1 ff-heading">Billed Monthly</span>
              <label className="switch">
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={isYearlyBilling}
                  onChange={handleBillingToggle}
                />
                <span className="pricing_table_switch_slide round" />
              </label>
              <span className="pricing_save2 ff-heading">Billed Yearly</span>
              <span className="pricing_save3">Save 20%</span>
            </div>
          </div>
        </div>
      </div> */}
      {/* End .row */}

      <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1" data-aos="fade-up" data-aos-delay="300">
        {pricingPackages.map((item, index) => (
          <div className="hover:scale-102 duration-300 " key={index}>
            <div className={`pricing_packages flex flex-col h-[90%]`}>
              <div className="heading ">
                <h5 className={`package_title ${item.uniqueClass || ""}`}>
                  {item.packageTitle}
                </h5>
                <h2 className=" text-[#0f8363]">
                  {item.price}
                </h2>
                <Image
                  width={60}
                  height={60}
                  className="price-icon"
                  src={item.priceIcon}
                  alt="icon"
                />
              </div>
              <div className="details flex flex-col justify-between h-full">
                <p className="text mb25">
                  {item.features[0]} {/* Display the first feature */}
                </p>
                <div className="list-style1 mb40">
                  <ul>
                    {item.features.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-[15px] leading-4">
                        <i className="far fa-check text-white bgc-dark fz15" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="d-grid ">
                  <a href="#" className="ud-btn btn-thm-border text-thm">
                    Buy
                    <i className="fal fa-arrow-right-long" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* End .row */}
    </>
  );
};

export default TenantPricing;
