import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import Layout from "../../layout/Layout";
import HeroSection from "./HeroSection";
import httpClients from "../../httpClient";
import { useCookies } from "react-cookie";
import { Books, BookType } from "../../types/bookType";
import "../../assets/css/Home.css"
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination/Pagination";
const HomePage = () => {
  const navigate = useNavigate();
  const [CartCount, setCartCount] = useState(0);

  const [Count, setCount] = useState(0);

  const [products, setProducts] = useState<BookType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cookies, setCookie,] = useCookies(["user"]);

  const [selectedProduct, setSelectedProduct] = useState<number>();

const productsRef = useRef<HTMLDivElement>(null); // Add ref here
 
  const [ProductDetail, setProductDetail] = useState<Books>({
    Id:0,
    Title:"",
    Image:"",
    authors:"",
    discount:1,
    Price:0,
    User_id:"",
    review_summary:"",
    review_text:"",
    descriptions:"",
    publisher:"",
    categories:"",
    ratingsCount:0,
    sentiment_label:undefined
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = (productId: number) => {
    console.log({ productId });
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
      .get("/api/book/all",{
        withCredentials:true,
        withXSRFToken:true,
        headers: { 'Authorization': `Bearer ${cookies.user}` } 
      },
      )
      .then((res) => {
        const result=res.data.slice(Count,Count+10)
        setProducts(result);
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
  }, [Count]);

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



    const addToCard = async () => {
      if(!cookies.user){
        navigate("/login");
      }
     await axios
        .post(`/api/order/${ProductDetail.Id}`, {},  {
          withCredentials:true,
          withXSRFToken:true,
          headers: { 'Authorization': `Bearer ${cookies.user}` }})
        .then((res) => {
          if (res.status === 201) {
            setCartCount(CartCount + 1);
            toast.success("Item Added to Cart");
          } else {
            toast.error("Failed to Add ");
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
            {products.length!==0 ? products?.map((p:Books) => {
              return (
                <>
                <div
                  key={p.Id}
                  className="card m-4 p-3"
                  style={{ width: "16rem", height: "28rem" }}
                >
                   <div className="my-2">
                      <b><p style={{float:"left", color: "black", fontSize:"16px"}} className="card-text">₹ {p.Price?.toString().substring(3)}</p></b>
                    </div>
                  <img
                  src={p.Image ?p.Image:"https://cdn.dribbble.com/users/604891/screenshots/16581214/media/bb111973c18ec6b36a067efdecc9a8ff.gif"}
                    onClick={() => p.Id!==undefined?showModal(p.Id):showModal(0)}
                    className="card-img-top"
                    alt={p.Title}
                    style={{ height: "280px"}}
                  />
                  
                  <div className="card-body text-center px-1">
                    
                    <h5 style={{color:"#878787"}} className="card-title"><b>{p.Title.substring(0,25)}...</b></h5>
                    {/* <div>
                      <b><p style={{float:"left", color: "black", fontSize:"16px"}} className="card-text">Author {p.a}</p>
                      <p style={{color: "black", float:"left", fontSize:"16px"}} className="card-text">Year OF Publication {p.yearOfPublication}</p></b>
                    </div> */}
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
                            src={ProductDetail.Image}
                            className="img-fluid rounded"
                            style={{ height: "300px" }}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex flex-column justify-content-between h-100 p-3">
                            <div>
                              <h2 style={{color:"#2874f0"}}>{ProductDetail.Title}</h2>
                              <p style={{fontSize:"15px", marginBottom:"-8px"}}>special price</p>
                              <b><p style={{color:"black", fontSize:"30px"}}>&#x20B9; {ProductDetail.Price?.toString().substring(3)} <span style={{color: "#388e3c", fontSize:"18px", marginLeft:"15px"}}>{ProductDetail.discount}% off</span></p></b>
                              <h6>Author : {ProductDetail?.authors}</h6>
                              <h6>Year OF Publication {ProductDetail.yearOfPublication}</h6>
                              <button             onClick={handleNavigate}
                                className="btn btn-light ms-1 btn-shadow m-1"
                              >
                               See Similar
                              </button>
                              <button
                                className="btn btn-light ms-1 btn-outline-dark m-1"
                                onClick={addToCard}
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
               
                 </>
            
            );
          }):<><h2 className="bookHeadline">No books available right now. Please check back later!</h2></>}
    </div>
        </div>
        <Pagination Count={Count} setCount={setCount}/>
      </Layout>
    </div>
  );
};

export default HomePage;
