"use client"
import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Pricing from "@/components/pages/pricing/Pricing";
import SellerPricing from "@/components/pages/pricing/SellersPricing";
import TenantPricing from "@/components/pages/pricing/TenantPricing";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


const PricingPlan = () => {
  const [buyerPlans, setBuyerPlans] = useState([])
  const [tenantPlans, setTenantPlans] = useState([])
  const [sellerPlans, setSellerPlans] = useState([])
  const role = Cookies.get("role")

    const { data, error, isError, isLoading } = useAxiosFetch("/plans");

    useEffect(()=>{
      console.log(data)
      const buyerPlans = data?.plans?.filter(plan => plan.category === "buy");
      const tenantPlans = data?.plans?.filter(plan => plan.category === "rent");
      const sellerPlans = data?.plans?.filter(plan => plan.role === "seller");

      setBuyerPlans(buyerPlans);
      setTenantPlans(tenantPlans);
      setSellerPlans(sellerPlans)
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

      {role == "seller" ? (<><section className="our-pricing pb90 pt-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb30">
                <h2>Seller Plans</h2>
                <p>Purchase plan to get these benefits.</p>
              </div>
            </div>
          </div>
          {/* End .row */}
          <SellerPricing sellerPlans={sellerPlans}/>
        </div>
        {/* End .container */}
      </section></>) : (<>
           
        {/*Buyers Pricing Section Area */}
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
            <Pricing buyerPlans={buyerPlans}/>
          </div>
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
            <TenantPricing tenantPlans={tenantPlans}/>
          </div>
        </section>
 
      </>)}



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
