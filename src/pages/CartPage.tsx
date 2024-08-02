import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { CartType } from "../types/cartType";
import axios from "axios";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useState<CartType[]>();
  const [cookies, setCookie,] = useCookies(["user"]);


    const getPreviousPendingOrder = async () => {
      await axios.get(`/api/order/mycart`,{
        withCredentials:true,
        withXSRFToken:true,
        headers: { 'Authorization': `Bearer ${cookies.user}` } 
      }).then((res)=>{
        setCart(res.data)
      });
     
    };
    
 

  // remove from cart
    const removeCartItem = async (orderId:number) => {
      try {
        await axios.delete(`api/order/removeCart/${orderId}`,{
          withCredentials:true,
          withXSRFToken:true,
          headers: { 'Authorization': `Bearer ${cookies.user}` } 
        });
        toast.success("cart item removed successfully!");
        const count=localStorage.getItem('cartCount');
        count===null?0:localStorage.setItem('cartCount',(parseInt(count)-1)+'')
        getPreviousPendingOrder();

      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getPreviousPendingOrder();
      localStorage.getItem('cartCount')===undefined?0:localStorage.getItem('cartCount')
    }, []);
  return (
    <Layout title={"Cart"}>
      <div className="container pb-2">
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center my-2">
              {cart?.length
                ? `You have ${localStorage.setItem("cartCount", cart?.length+'')===undefined?cart?.length:0} items in your cart`
                : "Your Cart is Empty"}
            </h4>
          </div>
          <hr />
        </div>

        <div className="row">
          <div className="col-md-8">
            {/* col-md-6 m-1 */}
            <div className="row"></div>
            {cart?.map((p) => (
              <>
                <div className="row mb-2 p-3 card flex-row" key={p.id}>
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img
                      src={p.Book.Image}
                      className="img-fluid"
                      alt={p.Book.Title}
                      width={"100px"}
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>Title {p.Book.Title}</p>
                    <p>Price ${p.Book.Price.toString().substring(3)}</p>
                    <p>Author {p.Book.authors}</p>
                    <p>Unit {p.unit}  || Total Price {(p.unit*p.Book.Price).toString().substring(3)}</p>
                    <button
                      className="btn btn-danger"
                        onClick={() => removeCartItem(p.id)

                        }
                    >
                      Remove Item
                    </button>
                  </div>
                  
                </div>
              </>
            ))}
          </div>

         
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
