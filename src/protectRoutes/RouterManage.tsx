import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CartPage from "../pages/CartPage";
import ProfilePage from "../pages/profile/ProfilePage";
import PageNotFound from "../pages/error/PageNotFound";
import ProtectRoutes from "./ProtectRoutes";
import AddBook from "../pages/book/AddBook";
import Recommendations from "../pages/bookview/Recommendations";
import About from "../pages/About";
import Contact from "../pages/Contact";
import UserOrders from "../pages/order/OrderHistory";


const RouterManage = () => {
  return (
    <>
      <Router>
        <div>
          <Toaster />
        </div>
        <Routes>
        <Route path="/"  element={<HomePage/>}/>
          <Route path="/login"  element={<Login/>}/>
          <Route path="/homepage" element={<HomePage/>} />
          <Route  path="/signup"  element={<Register/>} />
          <Route path="/bookview"  element={<Recommendations/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          

          <Route
            path="/profile"
            element={
              <ProtectRoutes>
                <ProfilePage/>
              </ProtectRoutes>
            }
          />
          <Route
            path="/userOrder"
            element={
              <ProtectRoutes>
                <UserOrders/>
              </ProtectRoutes>
            }
          />
             <Route
            path="/cart"
            element={
              <ProtectRoutes>
                <CartPage/>
              </ProtectRoutes>
            }
          />
              <Route
            path="/addbook"
            element={
              <ProtectRoutes>
                <AddBook/>
              </ProtectRoutes>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default RouterManage;