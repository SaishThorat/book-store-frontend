import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/Review.css";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([
    { id: 1, author: "Chintan", content: "It is a great book read so far" },
    {
      id: 1,
      author: "Saish",
      content: "Why I can’t stop reading the book, amazing!!",
    },
    { id: 1, author: "Sahil", content: "Seems like a totally fictional" },
  ]);
  const [newReview, setNewReview] = useState({ author: "", content: "" });


  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/product/${productId}/reviews`,
        newReview
      );
      setReviews([...reviews, response.data]);
      setNewReview({ author: "", content: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="reviews-container">
      <h2>Reviews</h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="review-form">
        <h3>Leave a Review</h3>
        <input
          type="text"
          name="author"
          value={newReview.author}
          onChange={handleInputChange}
          placeholder="Your Name"
          required
        />
        <textarea
          name="content"
          value={newReview.content}
          onChange={handleInputChange}
          placeholder="Your Review"
          required
        />
        <button
          type="submit"
          className="btn btn-light ms-1 btn-outline-dark m-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Reviews;
