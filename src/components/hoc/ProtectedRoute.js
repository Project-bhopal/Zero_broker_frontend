import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children, role }) => {
  const router = useRouter();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  // const role = JSON.parse(Cookies.get("role"));
  useEffect(() => {

    const restrictedRoutes = {
      admin: ["/dashboard/agent/add-property", "/dashboard"],
      buyer: ["/dashboard/seller/my-properties", "/my-reviews" , "/dashboard/agent/add-property", "/dashboard/home"],
      seller: ["/dashboard/agent/add-property", "/dashboard/my-favourites", "/dashboard/saved-search", "/my-plan", ""],
      agent: ["/dashboard-saved-search", "/my-favourites", "/my-plan"],
    };

    const userRole = role || "guest"; // Default to guest

    // Check if route is restricted for the user's role
    const isRestricted = restrictedRoutes[userRole]?.includes(pathname);

    if (isRestricted) {
      router.push("/dashboard/my-profile");
    }
  }, [pathname, role, router]);

  return children;
};

export default ProtectedRoute;
