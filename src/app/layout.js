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
import loader from "../../public/images/preloader.gif"
import useAxiosFetch from "@/hooks/useAxiosFetch";
import { usePropertyStore } from "@/store/store";
import axios from "axios";
const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;

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
      return
    }
    
    // if (!token && !publicRoutes.includes(pathname)) {
    //   router.push("/login");
    // }
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
  const {setProperties} = usePropertyStore()
  useEffect( ()=>{
    const fetchProperty = async()=>{
      const resposne = await axios.get(`${api_url}/property/approved`)
      setProperties(resposne.data.data);
    }
    fetchProperty();
  },[])

  if (isToken === null ) {
    return (
      <>
        <html>
          <body className="body bg-black">
            <div className="flex items-center justify-center min-h-screen bg-[#ffffff7f]">
              {/* <h1 className="text-white">Loading...</h1> */}
              <img src="/images/preloader.gif"/>
            </div>
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
