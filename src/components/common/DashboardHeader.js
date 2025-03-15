"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DashboardHeader = () => {
     const [role, setRole] = useState("")
      const pathname = usePathname();
      useEffect(()=>{
        const role = JSON.parse(Cookies.get("role"))
        setRole(role )
        // setRole("agent")
      },[])
    
  
    const buyermenuItems = [
      {
        title: "MAIN",
        items: [
          {
            href: "/dashboard-my-profile",
            icon: "flaticon-user",
            text: "My Profile",
          },
          {
            href: "/dashboard-message",
            icon: "flaticon-chat-1",
            text: "Message",
          },
        ],
      },
      {
        title: "MANAGE LISTINGS",
        items: [
          {
            href: "/dashboard-my-favourites",
            icon: "flaticon-like",
            text: "My Favorites",
          },
          {
            href: "/dashboard-saved-search",
            icon: "flaticon-search-2",
            text: "Saved Search",
          },
          {
            href: "/dashboard-reviews",
            icon: "flaticon-review",
            text: "Reviews",
          },
        ],
      },
      {
        title: "MANAGE ACCOUNT",
        items: [
          {
            href: "/dashboard-my-package",
            icon: "flaticon-protection",
            text: "My Plan",
          },
          {
            href: "/login",
            icon: "flaticon-logout",
            text: "Logout",
          },
        ],
      },
    ];
  
    const sellermenuItems = [
      {
        title: "MAIN",
        items: [
          {
            href: "/dashboard-home",
            icon: "flaticon-discovery",
            text: "Dashboard",
          },
          {
            href: "/dashboard-my-profile",
            icon: "flaticon-user",
            text: "My Profile",
          },
          {
            href: "/dashboard-message",
            icon: "flaticon-chat-1",
            text: "Message",
          },
        ],
      },
      {
        title: "MANAGE LISTINGS",
        items: [
          {
            href: "/dashboard-my-properties",
            icon: "flaticon-home",
            text: "My Properties",
          },
          {
            href: "/dashboard-reviews",
            icon: "flaticon-review",
            text: "Reviews",
          },
        ],
      },
      {
        title: "MANAGE ACCOUNT",
        items: [
          {
            href: "/login",
            icon: "flaticon-logout",
            text: "Logout",
          },
        ],
      },
    ];
  
    const agentmenuItems = [
      {
        title: "MAIN",
        items: [
          {
            href: "/dashboard-home",
            icon: "flaticon-discovery",
            text: "Dashboard",
          },
          {
            href: "/dashboard-my-profile",
            icon: "flaticon-user",
            text: "My Profile",
          },
          {
            href: "/dashboard-message",
            icon: "flaticon-chat-1",
            text: "Message",
          },
        ],
      },
      {
        title: "MANAGE LISTINGS",
        items: [
          {
            href: "/dashboard-add-property",
            icon: "flaticon-new-tab",
            text: "Add New Property",
          },
          {
            href: "/dashboard-my-properties",
            icon: "flaticon-home",
            text: "My Properties",
          },
          {
            href: "/dashboard-request-to-add-property",
            icon: "flaticon-home",
            text: "Requests",
          },
          {
            href: "/dashboard-reviews",
            icon: "flaticon-review",
            text: "Reviews",
          },
        ],
      },
      {
        title: "MANAGE ACCOUNT",
        items: [
          {
            href: "/login",
            icon: "flaticon-logout",
            text: "Logout",
          },
        ],
      },
    ];



  return (
    <>
      <header className="header-nav nav-homepage-style light-header position-fixed menu-home4 main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link className="logo" href="/">
                      <Image
                        width={138}
                        height={44}
                        src="/images/zero-broker/zero_brokerage_ae_long_h.jpg"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <a
                    className="dashboard_sidebar_toggle_icon text-thm1 vam md:hidden block"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <Image
                      width={25}
                      height={9}
                      className="img-1"
                      src="/images/zero-broker/icon/menu.svg"
                      alt="humberger menu"
                    />
                  </a>
                </div>
              </div>
              {/* End .col-auto */}

              <div className="d-none d-lg-block col-lg-auto">
                <MainMenu />
                {/* End Main Menu */}
              </div>
              {/* End d-none d-lg-block */}

              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="mb0 d-flex justify-content-center justify-content-sm-end p-0">
                    <li className="d-none d-sm-block">
                      <Link className="text-center mr15" href="/login">
                        <span className="flaticon-email" />
                      </Link>
                    </li>
                    {/* End email box */}

                    <li className="d-none d-sm-block">
                      <a className="text-center mr20 notif" href="#">
                        <span className="flaticon-bell" />
                      </a>
                    </li>
                    {/* End notification icon */}

                    <li className=" user_setting">
                      <div className="dropdown">
                        <a className="btn" href="#" data-bs-toggle="dropdown">
                          <Image
                            width={44}
                            height={44}
                            src="/images/resource/user.png"
                            alt="user.png"
                          />
                        </a>
                        <div className="dropdown-menu">
                          <div className="user_setting_content">
                            {role === "seller"&&sellermenuItems.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <p
                                  className={`fz15 fw400 ff-heading ${
                                    sectionIndex === 0 ? "mb20" : "mt30"
                                  }`}
                                >
                                  {section.title}
                                </p>
                                {section.items.map((item, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    className={`dropdown-item ${
                                      pathname == item.href ? "-is-active" : ""
                                    } `}
                                    href={item.href}
                                  >
                                    <i className={`${item.icon} mr10`} />
                                    {item.text}
                                  </Link>
                                ))}
                              </div>
                            ))}
                            {role === "buyer"&&buyermenuItems.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <p
                                  className={`fz15 fw400 ff-heading ${
                                    sectionIndex === 0 ? "mb20" : "mt30"
                                  }`}
                                >
                                  {section.title}
                                </p>
                                {section.items.map((item, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    className={`dropdown-item ${
                                      pathname == item.href ? "-is-active" : ""
                                    } `}
                                    href={item.href}
                                  >
                                    <i className={`${item.icon} mr10`} />
                                    {item.text}
                                  </Link>
                                ))}
                              </div>
                            ))}
                            {role === "agent"&&agentmenuItems.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <p
                                  className={`fz15 fw400 ff-heading ${
                                    sectionIndex === 0 ? "mb20" : "mt30"
                                  }`}
                                >
                                  {section.title}
                                </p>
                                {section.items.map((item, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    className={`dropdown-item ${
                                      pathname == item.href ? "-is-active" : ""
                                    } `}
                                    href={item.href}
                                  >
                                    <i className={`${item.icon} mr10`} />
                                    {item.text}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* End avatar dropdown */}
                  </ul>
                </div>
              </div>
              {/* End .col-6 */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* DesktopSidebarMenu */}
      {/* <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div> */}
      {/* Sidebar Panel End */}
    </>
  );
};

export default DashboardHeader;
