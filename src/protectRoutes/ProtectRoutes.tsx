import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectRoutes = ({ children }:any) => {
  const [cookies,] = useCookies(["user"]);

  if (cookies.user) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectRoutes;