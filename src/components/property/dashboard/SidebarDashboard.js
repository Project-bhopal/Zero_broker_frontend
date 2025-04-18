"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import RoleSwitch from "@/components/common/role-switch-buttons/RoleSwitch";

const SidebarDashboard = () => {
    const [role, setRole] = useState("")
    const pathname = usePathname();

    useEffect(()=>{
      const role = Cookies.get("role")
      if(role){
        const parsedRole = role
        setRole(parsedRole )
      }
      // setRole("agent")
    },[])

    


  const buyersidebarItems = [
    {
      title: "MAIN",
      items: [
        {
          href: "/dashboard/my-profile",
          icon: "flaticon-user",
          text: "My Profile",
        },
        {
          href: "/dashboard/message",
          icon: "flaticon-chat-1",
          text: "Message",
        },
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      items: [
        {
          href: "/dashboard/user/my-favourites",
          icon: "flaticon-like",
          text: "My Favorites",
        },
        {
          href: "/saved-search",
          icon: "flaticon-search-2",
          text: "Saved Search",
        },
        {
          href: "/dashboard/user/wallet",
          icon: "flaticon-review",
          text: "Wallet",
        },
        {
          href: "/my-reviews",
          icon: "flaticon-review",
          text: "Reviews",
        },
        {
          href: "/dashboard/user/subcription",
          icon: "flaticon-review",
          text: "Subcription",
        },
        {
          href: "/dashboard/user/payments",
          icon: "flaticon-review",
          text: "History",
        },
        
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      items: [
        {
          href: "/my-plan",
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
          href: "/dashboard/home",
          icon: "flaticon-discovery",
          text: "Dashboard",
        },
        {
          href: "/dashboard/my-profile",
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
          href: "/dashboard/seller/my-properties",
          icon: "flaticon-home",
          text: "My Listed Properties",
        }, 
        {
          href: "/dashboard/seller/request-to-add-new-property",
          icon: "flaticon-upload",
          text: "Request to add new Property",
        },
        {
          href: "/dashboard/seller/my-requests",
          icon: "flaticon-protection",
          text: "My Requests",
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
          href: "/dashboard/home",
          icon: "flaticon-discovery",
          text: "Dashboard",
        },
        {
          href: "/dashboard/my-profile",
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
          href: "/dashboard/agent/property-listed-by-me",
          icon: "flaticon-home",
          text: "Listed by Me",
        },
        {
          href: "/dashboard/agent/requests",
          icon: "flaticon-clock",
          text: "Seller's Requests",
        },
        {
          href: "/dashboard/agent/drivers-requests",
          icon: "flaticon-clock",
          text: "Driver's Requests",
        },
        {
          href: "/dashboard/agent/assigned-drivers",
          icon: "flaticon-clock",
          text: "Assigned Drivers",
        },
        {
          href: "/dashboard/agent/create-driver",
          icon: "flaticon-user",
          text: "Create Driver",
        },
        {
          href: "my-reviews",
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
  const adminsidebarItems = [
      {
        title: "MAIN",
        items: [
          {
            href: "/dashboard/home",
            icon: "flaticon-discovery",
            text: "Dashboard",
          },
          {
            href: "/dashboard/my-profile",
            icon: "flaticon-user",
            text: "My Profile",
          },
          {
            href: "/dashboard/message",
            icon: "flaticon-chat-1",
            text: "Message",
          },
        ],
      },
      {
        title: "MANAGE LISTINGS",
        items: [
          {
            href: "/dashboard/admin/agent-request",
            icon: "flaticon-new-tab",
            text: "Agent Requests",
          },
          {
            href: "/dashboard/admin/create-agent",
            icon: "flaticon-user-1",
            text: "Create",
          },
          {
            href: "/dashboard/admin/all-users",
            icon: "flaticon-user",
            text: "All Users",
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
  const driversidebarItems = [
      {
        title: "MAIN",
        items: [
          {
            href: "/dashboard/my-profile",
            icon: "flaticon-user",
            text: "My Profile",
          },
          {
            href: "/dashboard/message",
            icon: "flaticon-chat-1",
            text: "Message",
          },
        ],
      },
      {
        title: "MANAGE LISTINGS",
        items: [
          {
            href: "/dashboard/driver/add-media/1",
            icon: "flaticon-new-tab",
            text: "Add Media",
          }, 
          {
            href: "/dashboard/driver/uploaded-media",
            icon: "flaticon-clock",
            text: "Uploaded Media",
          }, 
          {
            href: "/dashboard/driver/assigned-properties",
            icon: "flaticon-home",
            text: "Assigned Properties",
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
        {role === "seller" || role === "buyer"?(<div className="mb-5 space-y-3">
        <label>Switch Account</label>
        <RoleSwitch role={role}/>
        </div>): ""}
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
        {role === "admin"&&adminsidebarItems.map((section, sectionIndex) => (
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
        {role === "driver"&&driversidebarItems.map((section, sectionIndex) => (
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
