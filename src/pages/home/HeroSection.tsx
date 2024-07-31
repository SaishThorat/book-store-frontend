import React from "react";
import "../../assets/css/HeroSection.css"; // Assuming you will create a separate CSS file for styles
// import image from "./path/to/your/image.png"; // Adjust the path to your image

const HeroSection = ({ handleScrolling }) => {
  return (
    <div className="hero-container">
      <div className="text-content">
        <h1>Wanna Read?</h1>
        <p>Welcome to the world of books</p>
        <button className="explore-button" onClick={handleScrolling}>
          Explore more
        </button>
      </div>
      <div className="image-content">
        <img
          src={
            "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*42ebJizcUtZBNIZPmmMZ5Q.jpeg"
          }
          alt="Book"
          className="hero-image"
        />
      </div>
    </div>
  );
};

export default HeroSection;
