"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
// import "../../node_modules/react-modal-video/scss/modal-video.scss";
// import "aos/dist/aos.css";
import "@/app/globals.css";
import "../../public/scss/main.scss";
import "../../public/css/property-details.css";
import "rc-slider/assets/index.css";
// import { DM_Sans } from "next/font/google";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
if (typeof window !== "undefined") {
  require("bootstrap/dist/css/bootstrap.min.css");
  require("bootstrap/dist/js/bootstrap.bundle.min");
}
import ProtectedRoute from "@/components/hoc/ProtectedRoute";
import DefaultHeader from "@/components/common/DefaultHeader";
import { UserContextProvider } from "@/context/useContext";

// if (typeof window !== "undefined") {
//   import("bootstrap");
// }
// DM_Sans font
// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   variable: "--body-font-family",
// });

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  const [isToken, setIsToken] = useState(null);
  const [role, setRole] = useState({})
  const [user, setUser] = useState("")
  // const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ["/", "/about", "/contactus", "/faq", "/login", "/register", "/buy/properties", "/rent/properties", "/commercial/properties", "/verification/verify-email", "/verification/verify-otp", "/create-new-password"];

  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
    // setShow(true);
    const token = Cookies.get("accessToken");
    const firstVisit = localStorage.getItem("firstVisit");
    
    const cookieRole = Cookies.get("role")
  
    if(cookieRole){
      const parsedRole = cookieRole
      setRole(parsedRole);
    }
    if(token){
      setIsToken(true);
    } else {
      setIsToken(false)
    }
    
    if (!token && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }
    if (!isToken && !firstVisit && !role) {
      setTimeout(() => {
        setShowModal(true);
      }, 3000);
    } else {
      setShowModal(false);
    }
   
  }, [pathname]);

  // useEffect(()=>{
  //   if (isToken === false) {
  //     router.push("/login");
  //   } else if (isToken === true) {
  //     router.push("/");
  //   }
  // },[isToken])

  if (isToken === null ) {
    return (
      <>
        <html>
          <body>
            <div>Loading...</div>
          </body>
        </html>
      </>
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <UserContextProvider value={{user, setUser}}>
        <html lang="en">
          <body className={`body `} cz-shortcut-listen="false">
            {/* {show && ( */}
              <>
            <ProtectedRoute role={role}>
                  <div className="wrapper ovh">{children}</div>
            </ProtectedRoute>
                <ScrollToTop />
              </>
            {/* )} */}
            
          </body>
        </html>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}
