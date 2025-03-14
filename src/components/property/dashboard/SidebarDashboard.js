"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SidebarDashboard = () => {
    const [role, setRole] = useState("")
    const pathname = usePathname();

    useEffect(()=>{
      const user = Cookies.get("user")
      if(user){
        const parsedUser = JSON.parse(user)
        setRole(parsedUser.role )
      }
      // setRole("agent")
    },[])
  

  const buyersidebarItems = [
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

  const sellersidebarItems = [
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

  const agentsidebarItems = [
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
          href: "/dashboard-requests",
          icon: "flaticon-request-to-add",
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
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {role === "seller"&&sellersidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p
              className={`fz15 fw400 ff-heading ${
                sectionIndex === 0 ? "mt-0" : "mt30"
              }`}
            >
              {section.title}
            </p>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">
                <Link
                  href={item.href}
                  className={`items-center   ${
                    pathname == item.href ? "-is-active" : ""
                  } `}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        ))}
        {role === "buyer"&&buyersidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p
              className={`fz15 fw400 ff-heading ${
                sectionIndex === 0 ? "mt-0" : "mt30"
              }`}
            >
              {section.title}
            </p>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">
                <Link
                  href={item.href}
                  className={`items-center   ${
                    pathname == item.href ? "-is-active" : ""
                  } `}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        ))}
        {role === "agent"&&agentsidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p
              className={`fz15 fw400 ff-heading ${
                sectionIndex === 0 ? "mt-0" : "mt30"
              }`}
            >
              {section.title}
            </p>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">
                <Link
                  href={item.href}
                  className={`items-center   ${
                    pathname == item.href ? "-is-active" : ""
                  } `}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarDashboard;
