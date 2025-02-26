"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
// import "../../node_modules/react-modal-video/scss/modal-video.scss";
// import "aos/dist/aos.css";
import "@/app/globals.css"
import "../../public/scss/main.scss";
import "../../public/css/property-details.css";
import "rc-slider/assets/index.css";
// import { DM_Sans } from "next/font/google";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

  const [show, setShow] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
    setShow(true)
  }, []);

  return (
  <>
    <QueryClientProvider client={queryClient}>
    <html lang="en">
      <body
        className={`body `}
        cz-shortcut-listen="false"
      >
        {show &&
          <>
            <div className="wrapper ovh">{children}</div>

            <ScrollToTop />
          </>
        }

      </body>
    </html>
    </QueryClientProvider>
    </>
  );
}
