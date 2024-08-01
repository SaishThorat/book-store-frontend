import { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AppContext } from "../contextApi/CreateContextApi"
import { useCookies } from "react-cookie";

const ProtectRoutes = ({ children }:any) => {
//   const { user, setUser } = useContext(AppContext);
  const [cookies, setCookie] = useCookies(["user"]);

  if (cookies.user) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectRoutes;