import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BookCarousel = ({ books, onSelectBook }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h2>Recommendations</h2>
      <Slider {...settings}>
        {books.map((book, index) => (
          <div key={index} onClick={() => onSelectBook(book)}>
            <img
              src={book.coverImage}
              alt={book.title}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BookCarousel;
