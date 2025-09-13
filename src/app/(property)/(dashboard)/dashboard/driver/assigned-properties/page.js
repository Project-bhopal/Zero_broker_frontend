"use client"
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import AssignedPropertiesDataTable from "@/components/property/dashboard/driver/AssignedPropertiesDataTable";
import AssignmentAcceptedDataTable from "@/components/property/dashboard/driver/AssignmentAcceptedDataTable";
import useAxiosFetch from "@/hooks/useAxiosFetch";
import { useState } from "react";


const AssignedProperties = () => {

  const {data, error , isLoading, isError} = useAxiosFetch(`/driver/driver/assignments`)
  console.log(data?.data)

  return (
    <>
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

              
              <div className="row align-items-center pb40">
                <div className="col-xxl-3">
                  <div className="dashboard_title_area">
                    <h2>Assigned Properties</h2>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-xl-12 min-h-[50vh]">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="packages_table table-responsive"> 
                        
                        
                        <AssignedPropertiesDataTable assignments={data?.data} />
                      
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

export default AssignedProperties;
