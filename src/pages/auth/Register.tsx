import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SigninPic from "../../assets/images/signin-image.jpg";
import toast from "react-hot-toast";
import "../../assets/css/login1.css"
import { Role } from "../../contants";
import axios from "axios";
import httpClients from "../../httpClient";

const Register = () => {
  

  const [userDetails,SetUserDetails]=useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  })


  const handleChangeInput=(e:any)=>{
    const { name, value } = e.target;
    SetUserDetails({
      ...userDetails,
      [name]: value,
    });
  }

  const [userRole, setUserRole] = useState("Role");
  const navigate = useNavigate();
  const signupMe = async () => {
    let isvalid = false;
    if (
      (userDetails.name === "") || (userDetails.email === "") ||
      (userDetails.password === "") || (userDetails.phoneNumber === "")
    ) {
      toast.error("Please fill all fields!");
    } else {
        let data = {  name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
          phoneNumber: userDetails.phoneNumber,
          roleId: Role.indexOf(userRole)+1 };


          await httpClients
          .post("/api/auth/signup",data)
          .then((res) => {
            if (res?.status === 201) {
              isvalid = true;
            }
          })
          .catch((err) => {
            if (err.response?.status === 401 || 500) {
              toast.error("Email already in use , try with another email !");
              navigate("/signup");
            }
          });
    }
    if (isvalid) {
      toast.success("signup succefully login please !!");
      navigate("/login");
    }
  };
  const [isGenderSelected, setisGenderSelected] = useState(false);
  return (
    <div>
      <div className="main">
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Register Here </h2>

               
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name" />
                    </label>
                    <input
                      type="text"
                      value={userDetails.name}
                      onChange={handleChangeInput}
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email" />
                    </label>
                    <input
                      type="email"
                      value={userDetails.email}
                      onChange={handleChangeInput}
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pass">
                      <i className="zmdi zmdi-lock" />
                    </label>
                    <input
                      type="password"
                      value={userDetails.password}
                      onChange={handleChangeInput}
                      name="password"
                      id="pass"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="re-pass">
                      <i className="zmdi zmdi-lock-outline" />
                    </label>
                    <input
                      type="text"
                      value={userDetails.phoneNumber}
                      onChange={handleChangeInput}
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div className="btn-group">
                    <button
                      className={`btn-sm dropdown-toggle btn btn-light ms-1 btn-outline-dark m-1 ${
                        isGenderSelected ? "selected" : "not-selected"
                      }`}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userRole}
                    </button>
                    <ul className="dropdown-menu" >
                      <div>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              setUserRole("USER");
                              setisGenderSelected(true);
                            }}
                          >
                            USER
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              setUserRole("PUBLISHER");
                              setisGenderSelected(true);
                            }}
                          >
                            PUBLISHER
                          </button>
                        </li>
                       
                      </div>
                    </ul>
                  </div>

                  <div className="form-group form-button">
                    <input
                      type="submit"
                      onClick={signupMe}
                      name="signup"
                      id="signup"
                      className="form-submit"
                      defaultValue="Register"
                    />
                  </div>
              </div>
              <div className="signup-image">
                <figure>
                  <img src={SigninPic} alt="sing up image" />
                </figure>
                <a href="/login" className="signup-image-link">
                  I am already member
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
