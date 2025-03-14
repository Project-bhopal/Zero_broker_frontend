import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children, user }) => {
  const router = useRouter();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  // const user = JSON.parse(Cookies.get("user"));
  useEffect(() => {

    const restrictedRoutes = {
      admin: ["/dashboard-add-property", "/dashboar"],
      buyer: ["/dashboard-my-properties", "/dashboard-reviews" , "/dashboard-add-property", "/dashboard-home"],
      seller: ["/dashboard-add-property", "/dashboard-my-favourites", "/dashboard-saved-search", "/dashboard-my-package", ""],
      agent: ["/dashboard-saved-search", "/dashbaord-my-favourites", "/dashboard-my-package"],
    };

    const userRole = user?.role || "guest"; // Default to guest

    // Check if route is restricted for the user's role
    const isRestricted = restrictedRoutes[userRole]?.includes(pathname);

    if (isRestricted) {
      router.push("/dashboard-my-profile");
    }
  }, [pathname, user, router]);

  return children;
};

export default ProtectedRoute;
