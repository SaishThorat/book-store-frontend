import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { CartType } from "../../types/cartType";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
const UserOrders = () => {
  const [orders, setorders] = useState<CartType[]>();
  const [cookies, setCookie,] = useCookies(["user"]);
  
  const allproducts = async () => {

    const user= jwtDecode(cookies.user);

    const userUrl = `/api/order/${
        user?.role === "ADMIN" ? "" : user.sub
    }`;
    const data = await axios.get(userUrl, {
      headers: {
        Authorization: `Bearer ${cookies.user}`,
      },
    });
    setorders(data.data);
  };



  

  useEffect(() => {
    allproducts();
  }, []);

  return (
    <>
      <Layout>
        <center className="pt-3">
          {" "}
          <table className="container w-75 mx-5 table table-hover my-3 table-striped">
            <thead>
              <tr className="table-dark">
                <th scope="col">User ID</th>
                <th scope="col">Order ID</th>
                <th scope="col">Product NAME</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">PRICE</th>
                <th scope="col">DATE</th>
                <th scope="col">TIME</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length === 0 ? (
                <div className="text-center my-5">
                  <div
                    className="spinner-border spinner-grow text-primary"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                orders?.map((ele:CartType) => {
                  return (
                    <tr key={ele.id}>
                      <th scope="row">{ele.user.name}</th>
                      <th scope="row">{ele.id}</th>
                      <td>{ele.Book.Title}</td>
                      <td>{ele.Book.authors}</td>
                      <td>{ele.Book.Price}</td>
                      {/* <td
                        style={{
                          color: `${
                            ele.Book..status === "PENDING" ? "red" : "green"
                          }`,
                          fontWeight: "bolder",
                          fontFamily: "initial",
                          fontVariant: "full-width",
                          fontVariantCaps: "all-petite-caps",
                          fontSize: "16px",
                        }}
                      >
                        {ele.order.status === null
                          ? "PENDING"
                          : ele.order.status}
                      </td> */}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </center>
      </Layout>
    </>
  );
};

export default UserOrders;