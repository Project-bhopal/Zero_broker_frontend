"use client"
import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Pricing from "@/components/pages/pricing/Pricing";
import TenantPricing from "@/components/pages/pricing/TenantPricing";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import { useEffect, useState } from "react";


const PricingPlan = () => {
  const [buyerPlans, setBuyerPlans] = useState([])
  const [tenantPlans, setTenantPlans] = useState([])

    const { data, error, isError, isLoading } = useAxiosFetch("/plans");
    useEffect(()=>{
      console.log(data)
      const buyerPlans = data?.plans?.filter(plan => plan.category === "buy");
      const tenantPlans = data?.plans?.filter(plan => plan.category === "rent");

      setBuyerPlans(buyerPlans);
      setTenantPlans(tenantPlans);
    },[data])
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Sections */}
      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Plans</h2>
                <div className="breadcumb-list">
                  <a href="/">Home</a>
                  <a href="#">Plans</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Sections */}

      {/* Buyers Pricing Section Area */}
      <section className="our-pricing pb90 pt-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb30">
                <h2>Buyer Plans</h2>
                <p>Purchase plan to get these benefits.</p>
              </div>
            </div>
          </div>
          {/* End .row */}
          <Pricing buyerPlans={buyerPlans}/>
        </div>
        {/* End .container */}
      </section>

      {/*Tenants Pricing Section Area */}
      <section className="our-pricing pb90 pt-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb30">
                <h2>Tenant Plans</h2>
                <p>Purchase plan to get these benefits.</p>
              </div>
            </div>
          </div>
          {/* End .row */}
          <TenantPricing tenantPlans={tenantPlans}/>
        </div>
        {/* End .container */}
      </section>
      {/* End Pricing Section Area */}

      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default PricingPlan;
