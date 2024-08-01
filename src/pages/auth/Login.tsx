import { Link } from "react-router-dom";
import LoginPic from "../../assets/images/signup-image.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import httpClients from "../../httpClient";


const Login = () => {

  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const signIn = async () => {
    // axios call

    await httpClients
      .post("/api/auth/login", {
        email: loginDetails.email,
        password: loginDetails.password,
      })
      .then((res) => {
        if (res?.status === 201) {
          toast.success("login successfully ");
          navigate("/homePage");
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          toast.error("Invalid credential.");
          navigate("/login");
        }
      });
  };





  // const [email, Setemail] = useState("");
  // const [password, Setpassword] = useState("");
  // const navigate = useNavigate();

  // const signIn =async () => {

  //   try {
  //       if (email === "" || password === "") {
  //           toast.error("Please fill all fields!");
  //         } else {
  //           const res= await fetch('/api/auth/login',
  //             {
  //                 method:"POST",
  //                 headers:{"Content-Type": "application/json"},
  //                 body:JSON.stringify({email,password}),
  //             });

  //           const token=await res.json();
  //          const user= jwtDecode(token);
  //          console.log(user)

  //           if(res.status===201){
  //               toast.success(" login successfully !!");
  //           navigate("/homepage"); 
  //           }
  //         }
  //   } catch (error) {
  //           toast.error(" Please login with correct credentials !!");
  //           navigate("/login");
  //   }

  return (
    <div>
      <div className="main">
        <section className="sign-in pt-5">
          <div className="container_page">
            <div className="signin-content">
              <div className="signin-image">
                <figure>
                  <img src={LoginPic} alt="sing up image" />
                </figure>
                <Link to="/signup" className="signup-image-link">
                  Don't have an account?
                </Link>
              </div>
              <div className="signin-form">
                <h2 className="form-title">Login</h2>
                  <div className="form-group">
                    <label htmlFor="your_name">
                      <i className="zmdi zmdi-account material-icons-name" />
                    </label>
                    <input
                      type="text"
                      value={loginDetails.email}
                      onChange={handleInputChange}
                      required
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="your_pass">
                      <i className="zmdi zmdi-lock" />
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={loginDetails.password}
                      onChange={handleInputChange}
                      required
                      id="password"
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signin"
                      id="signin"
                      className="form-submit"
                      onClick={signIn}
                      defaultValue="Log in"
                    />
                  </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
