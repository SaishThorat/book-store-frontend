import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { BookType } from "../../types/bookType";
import { useCookies } from "react-cookie";
const AddBook = () => {
  const navigate = useNavigate();
  const [cookies, setCookie,] = useCookies(["user"]);

  const [bookData, setbookData] = useState<BookType>({
    title: "",
    author: "",
    price: undefined,
    yearOfPublication: undefined,
    url: "",
    discount: undefined,
  });

  const handleInputChange = (e:any) => {
    const { name, value, type } = e.target;

    if (type === "file") {
        setbookData({
        ...bookData,
        [name]: e.target.files[0],
      });
    } else {
        setbookData({
        ...bookData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    console.log({bookData})
    if (
      (bookData.title === "") ||
      (bookData.price === undefined) ||
   
      (bookData.author === "") ||
      (bookData.yearOfPublication === undefined) ||
      (bookData.discount === undefined)
    ) {
      toast.error("Please fill all fields");
    }else {
 
      await axios
        .post("/api/book", {
            title: bookData.title,
            author:bookData.author,
            price:Number(bookData.price),
            yearOfPublication:Number(bookData.yearOfPublication),
            url: bookData.url,
        },
            {
                withCredentials:true,
                withXSRFToken:true,
                headers: { 'Authorization': `Bearer ${cookies.user}` } 
        })
        .then((res) => {
          if (res.status === 200) toast.success("book Added");
          navigate("/homepage");
        })
        .catch(() => {
          console.error();
          toast.error("Error in adding book");
        });
    }
  };

  return (
    <Layout title={"Add Book"}>
      <div
        className="container mt-5 py-3 px-5"
        style={{
          width: "850px",
          padding: "0px 50px",
          background: "#a2a2a247",
        }}
      >
        <h3 className="mb-3" style={{ textAlign: "center" }}>
          Fill Book Details
        </h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleInputChange}
            placeholder="Book title"
            required
          />
        </div>
        {/* <div className="mb-3">
          <select
            className="form-control"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="mens">Men's</option>
            <option value="womens">Women's</option>
            <option value="electronics">Electronics</option>
            <option value="accessories">Accessories</option>
          </select>
        </div> */}
        <div className="mb-3">
          <input
            type="text"
            title="Please enter Author name"
            className="form-control"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
            placeholder="Book author"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            title="Please enter a book price"
            className="form-control"
            id="price"
            name="price"
            value={bookData.price}
            onChange={handleInputChange}
            placeholder="Book price"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            id="discount"
            name="discount"
            required
            value={bookData.discount}
            onChange={handleInputChange}
            placeholder="Book discount"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="url"
            name="url"
            placeholder="Book url"
            value={bookData.url}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            id="yearOfPublication"
            name="yearOfPublication"
            required
            value={bookData.yearOfPublication}
            onChange={handleInputChange}
            placeholder="Year Of Publication"
          />
        </div>
        <center>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </center>
      </div>
    </Layout>
  );
};

export default AddBook;