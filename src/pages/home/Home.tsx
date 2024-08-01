import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import Layout from "../../layout/Layout";
import HeroSection from "./HeroSection";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../assets/css/Home.css";

const HomePage = () => {
  const navigate = useNavigate();
  const productsRef = useRef<HTMLDivElement>(null); // Add ref here
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Hellen Keller",
      discount: 1,
      price: 324,
    },
    {
      id: 2,
      name: "Harry Potter",
      discount: 1,
      price: 345,
    },
    {
      id: 3,
      name: "Superman",
      discount: 1,
      price: 134,
    },
    {
      id: 4,
      name: "sdfsdf",
      discount: 1,
      price: 234,
    },
    {
      id: 5,
      name: "sfgfh",
      discount: 1,
      price: 556,
    },
    {
      id: 6,
      name: "hgftr",
      discount: 1,
      price: 678,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number>();
  const [ProductDetail, setProductDetail] = useState({
    id: 1,
    name: "Book Name",
    discount: 1,
    price: "$",
    description: "Desc",
    category: "Category",
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = (productId: number) => {
    console.log({ productId });
    setSelectedProduct(productId);
    setOpen(true);
    // getProduct(productId);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      console.log("order Placed");
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/product/allproducts`,
        { withCredentials: false }
      );
      setLoading(false);
      setProducts(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const orders = {
    userId: 1,
    productId: 5,
    status: "PENDING",
    timeAndDate: "",
  };

  const handleNavigate = () => {
    console.log("Trying to navigate");
    navigate("/bookview");
  };

  // Function to handle scrolling
  const handleScroll = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="homepage-container">
      <Layout>
        <HeroSection handleScrolling={handleScroll} />
        <div className="col-md-12 order-md-2 order-1 pt-2" ref={productsRef}>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => {
              return (
                <div
                  key={p.id}
                  className="card m-4 p-3"
                  style={{ width: "16rem", height: "24rem" }}
                >
                  <img
                    src={`http://localhost:8080/product/${p.id}/image`}
                    onClick={() => showModal(p.id)}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "280px" }}
                  />
                  <div className="card-body text-center px-2">
                    <h5 style={{ color: "#878787" }} className="card-title">
                      <b>{p.name}</b>
                    </h5>
                    <div>
                      <b>
                        <p
                          style={{
                            float: "left",
                            color: "black",
                            fontSize: "16px",
                          }}
                          className="card-text"
                        >
                          ₹ {p.price}
                        </p>
                        <p
                          style={{
                            color: "#388e3c",
                            float: "right",
                            fontSize: "16px",
                          }}
                          className="card-text"
                        >
                          {p.discount}% off
                        </p>
                      </b>
                    </div>
                    <Modal
                      title="Product Detail"
                      open={open}
                      onOk={handleOk}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                      width={1000}
                    >
                      <div className="row container">
                        <div className="col-md-6">
                          <img
                            src={`http://localhost:8080/product/${selectedProduct}/image`}
                            className="img-fluid rounded"
                            style={{ height: "300px" }}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex flex-column justify-content-between h-100 p-3">
                            <div>
                              <h2 style={{ color: "#2874f0" }}>
                                {ProductDetail.name}
                              </h2>
                              <p
                                style={{
                                  fontSize: "15px",
                                  marginBottom: "-8px",
                                }}
                              >
                                special price
                              </p>
                              <b>
                                <p style={{ color: "black", fontSize: "30px" }}>
                                  &#x20B9; {ProductDetail.price}{" "}
                                  <span
                                    style={{
                                      color: "#388e3c",
                                      fontSize: "18px",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    {ProductDetail.discount}% off
                                  </span>
                                </p>
                              </b>
                              <p>Category : {ProductDetail?.category}</p>
                              <h6>{ProductDetail.description}</h6>
                              <button
                                onClick={handleNavigate}
                                className="btn btn-light ms-1 btn-shadow m-1"
                              >
                                View the Book
                              </button>
                              <button
                                className="btn btn-light ms-1 btn-outline-dark m-1"
                                style={{ width: "100%" }}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
