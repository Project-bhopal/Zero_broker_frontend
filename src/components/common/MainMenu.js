import {
  homeItems,
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";
import { pageRoutes } from "@/utilis/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = ({ navbar }) => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("home");
      }
    });
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };

  const menu = [
    {
      name: "Buy",
      url: pageRoutes.buy.properties,
      // url: pageRoutes.propertys,
      submenu: false,
    },
    {
      name: "Rent",
      url: pageRoutes.rent.propertyForRent,
      submenu: false,
    },
    {
      name: "Commercial",
      url: "/commercial/properties",
      submenu: false,
    },
    {
      name: "New projects",
      url: "/",
      submenu: false,
    },
    {
      name: "Find agent",
      url: "/",
      submenu: false,
    },
    // {
    //   name: "Explore",
    //   url: "/",
    //   submenu: true,
    //   subMenus: [
    //     {
    //       name: "Explore 001",
    //       url: "/001",
    //     },
    //     {
    //       name: "Explore 002",
    //       url: "/",
    //     },
    //   ],
    // },
    // {
    //   name: "Mortgages",
    //   url: "/",
    //   submenu: false,
    // },
  ];

  return (
    <ul className="ace-responsive-menu">
      {menu?.map((res, index) =>
        res?.submenu ? (
          <li className="visible_list dropitem" key={index}>
            <a className="list-item" href="#">
              <span
                className={topMenu == res.name ? "title menuActive" : "title"}
              >
                {res.name}
              </span>
              <span className="arrow"></span>
            </a>
            <ul className="sub-menu">
              {res?.subMenus?.map((item, index2) => (
                <li key={"key" + index2}>
                  <Link className={`${handleActive(item.url)}`} href={item.url}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li
            className="visible_list menuActive"
            key={index}
            style={{
              textShadow: (navbar || pathname !== "/") ? "" : "2px 2px 6px rgba(0, 0, 0, 0.8)",
            }}
          >
            <Link
              className={`list-item`}
              href={res.url}
              style={{
                color: (navbar || pathname !== "/") ? "" : "#ffffff",
                textShadow: (navbar || pathname !== "/") ? "" : "3px 3px 8px rgba(0, 0, 0, 0.9)",
              }}
            >
              {res.name}
            </Link>
          </li>

        )
      )}

      {/* End homeItems */}
    </ul>
  );
};

export default MainMenu;
