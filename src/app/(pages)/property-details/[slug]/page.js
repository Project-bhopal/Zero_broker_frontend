import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import React from "react";
import PropertyDetails from "@/components/pages/property-details/PropertyDetails";

const Page = () => {
  return (
    <>
      <DefaultHeader />
      <MobileMenu />

      <PropertyDetails />
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Page;
