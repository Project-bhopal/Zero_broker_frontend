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
import { useRouter } from "next/navigation";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import WelcomeModal from "@/components/common/WelcomeModal";

if (typeof window !== "undefined") {
  import("bootstrap");
}

// DM_Sans font
// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   variable: "--body-font-family",
// });

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  const [isToken, setIsToken] = useState(null);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();


  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
    setShow(true);

    const token = Cookies.get("accessToken");
    const firstVisit = localStorage.getItem("firstVisit");

    if(token){
      setIsToken(true);
    } else {
      setIsToken(false)
    }

    if (!isToken && !firstVisit) {
        localStorage.setItem("firstVisit", "true");
        setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, []);

  useEffect(()=>{
    if (isToken === false) {
      router.push("/login");
    } else if (isToken === true) {
      router.push("/");
    }
  },[isToken])

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
        <html lang="en">
          <body className={`body `} cz-shortcut-listen="false">
            {show && (
              <>
                  <div className="wrapper ovh">{children}</div>
                <ScrollToTop />
              </>
            )}

            <WelcomeModal showModal={showModal} setShowModal={setShowModal} />
          </body>
        </html>
      </QueryClientProvider>
    </>
  );
}
