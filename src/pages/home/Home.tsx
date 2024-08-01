import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { useCartCount } from "../ContextApi/Cart";
import { Modal } from "antd";
import Layout from "../../layout/Layout";
import HeroSection from "./HeroSection";
import httpClients from "../../httpClient";
import { useCookies } from "react-cookie";
import { BookType } from "../../types/bookType";
import "../../assets/css/Home.css"
const HomePage = () => {
//   const [CartCount, setCartCount] = useCartCount();

  const [products, setProducts] = useState<BookType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cookies, setCookie,] = useCookies(["user"]);

  const [selectedProduct, setSelectedProduct] = useState<number>();
  const [ProductDetail, setProductDetail] = useState<BookType>({
    ISBN:1,
    title:"",
    url:"",
    author:"",
    yearOfPublication:0,
    discount:0,
    price:0
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  
  const showModal = (productId:number) => {
    console.log({productId})
    setSelectedProduct(productId);
    setOpen(true);
    getProduct(productId);
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
      await httpClients
      .get("/api/book",{
        withCredentials:true,
        withXSRFToken:true,
        headers: { 'Authorization': `Bearer ${cookies.user}` } 
      },
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          toast.error("Invalid credential.");
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // get product
  const getProduct = async (productId:number) => {
    try {
      const { data } = await axios.get(
        `/api/book/${productId}`,
        {
          withCredentials:true,
          withXSRFToken:true,
          headers: { 'Authorization': `Bearer ${cookies.user}` } 
        }
      );
      setProductDetail(data);
    } catch (error) {
      console.log(error);
    }
  };
  const orders = {
    userId: 1,
    productId: 5,
    status: "PENDING",
    timeAndDate: "",
  };

  //   const addToCard = async () => {
  //     const { data } = await axios
  //       .post(`http://localhost:8080/order/add`, {
  //         ...orders,
  //         productId: ProductDetail.id,
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //         //   setCartCount(CartCount + 1);
  //         //   localStorage.setItem("cartCount", CartCount);
  //           toast.success("Item Added to Cart");
  //         } else {
  //           toast.error("Failed to Add ");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   useEffect(() => {
  //     // getProduct();
  //   }, [CartCount]);
  const handleNavigate = () => {
    console.log("Trying to navigate");
    // navigate("/bookview");
  };

  return (
    <Layout>
      <HeroSection handleScrolling={null} />
      <div className="col-md-12 order-md-2 order-1 pt-2 book-content" >
        <div className="d-flex flex-wrap justify-content-center">
    
          {products.length!==0 ? products?.map((p:BookType) => {
            return (
              <>
                <div  
                  className="card m-4 p-3"
                  style={{ width: "16rem", height: "24rem" }}
                >
                  <img
                  src={p.url ?p.url:"https://cdn.dribbble.com/users/604891/screenshots/16581214/media/bb111973c18ec6b36a067efdecc9a8ff.gif"}
                    onClick={() => p.ISBN!==undefined?showModal(p.ISBN):showModal(0)}
                    className="card-img-top"
                    alt={p.title}
                    style={{ height: "280px"}}
                  />
                  
                  <div className="card-body text-center px-1">
                    <h5 style={{color:"#878787"}} className="card-title"><b>{p.title}</b></h5>
                    <div>
                      <b><p style={{float:"left", color: "black", fontSize:"16px"}} className="card-text">Author {p.author}</p>
                      <p style={{color: "black", float:"left", fontSize:"16px"}} className="card-text">Year OF Publication {p.yearOfPublication}</p></b>
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
                            src="https://cdn.dribbble.com/users/604891/screenshots/16581214/media/bb111973c18ec6b36a067efdecc9a8ff.gif"
                            className="img-fluid rounded"
                            style={{ height: "300px" }}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex flex-column justify-content-between h-100 p-3">
                            <div>
                              <h2 style={{color:"#2874f0"}}>{ProductDetail.title}</h2>
                              <p style={{fontSize:"15px", marginBottom:"-8px"}}>special price</p>
                              <b><p style={{color:"black", fontSize:"30px"}}>&#x20B9; {ProductDetail.price} <span style={{color: "#388e3c", fontSize:"18px", marginLeft:"15px"}}>{ProductDetail.discount}% off</span></p></b>
                              <h6>Author : {ProductDetail?.author}</h6>
                              <h6>Year OF Publication {ProductDetail.yearOfPublication}</h6>
                              <button
                                className="btn btn-light ms-1 btn-outline-dark m-1"
                                // onClick={addToCard}
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
                 
                    <div className="my-2">
                      <b><p style={{float:"left", color: "black", fontSize:"16px"}} className="card-text">₹ {p.price}</p>
                      <p style={{color: "#388e3c", float:"right", fontSize:"16px"}} className="card-text">{p.discount===undefined?'-':p.discount} % off</p></b>
                    </div>
                </div>
              </>
            );
          }):<><h2 className="bookHeadline">No books available right now. Please check back later!</h2></>}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
