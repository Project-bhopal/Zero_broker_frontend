"use client";
import { ApiFetchRequest, ApiPutRequest } from "@/axios/apiRequest";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import Head from "next/head";
import AgentPersonalInfo from "@/components/property/dashboard/agent-profile/AgentPersonalInfo";
import { useState } from "react";
import CreateDriver from "@/components/property/dashboard/agent/CreateDriver";
const api_url = process.env.NEXT_PUBLI_API_BASE_UR;


const AgentProfile = () => {
  const [create, setCreate] = useState("Driver")

  return (
    <>
      <Head>
          Dashboard My Profile || ZeroBroker - Real Estate NextJS Template
      </Head>
      <DashboardHeader />
      <MobileMenu />
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
              </div>
              <div className="row align-items-center ">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Create driver</h2>
                    <p className="text">We are glad to see you again!</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-self-end gap-2 me-3 mb-5">
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">

                    <div className="col-lg-12">
                      <CreateDriver create={create}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentProfile;
