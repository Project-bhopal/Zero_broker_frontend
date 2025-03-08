"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = Cookies.get("accessToken");

//     if (!token) {
//       router.push("/login");
//       setLoading(false)
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   if (loading) return <div>Loading...</div>; 

  return <>{children}</>;
};

export default ProtectedRoute;
