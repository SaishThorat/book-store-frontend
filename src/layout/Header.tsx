import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoSchool } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import toast from "react-hot-toast";
import { Badge } from "antd";
import "../assets/css/HeaderStyle.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const userType = "user"; // Change this value to "admin" for testing admin view

  const handleLogout = () => {
    navigate("/login");
    toast.success("Logout Successfully");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/homepage" className="navbar-brand">
              <IoSchool /> BookBazaar
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-5">
              <li className="nav-item mx-1">
                <NavLink to="/homepage" className="nav-link btn-2">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown mx-1">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li className="dropdown-submenu">
                    <Link className="dropdown-item dropdown-toggle" to="#">
                      All Books
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/all-books/sci-fi">
                          Sci-Fi
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/all-books/horror">
                          Horror
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/all-books/comedy">
                          Comedy
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/elearning">
                      E-Learning Books
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/physical">
                      Physical Books
                    </Link>
                  </li>
                </ul>
              </li>
              <form className="d-flex" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
              <li className="nav-item dropdown mx-1">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  User
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to={`/profile`} className="dropdown-item">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/employee`}
                      className={`dropdown-item ${
                        userType === "admin" ? "d-block" : "d-none"
                      }`}
                    >
                      Manage Employees
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/product`}
                      className={`dropdown-item ${
                        userType === "admin" ? "d-block" : "d-none"
                      }`}
                    >
                      Manage Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/userOrder`}
                      className={`dropdown-item ${
                        userType === "admin" ? "d-block" : "d-none"
                      }`}
                    >
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item p-1 mx-1">
                <Badge>
                  <NavLink to="/cart" className="nav-link">
                    <span style={{ fontFamily: "Poppins", fontSize: "20px" }}>
                      <IoMdCart />
                    </span>
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
