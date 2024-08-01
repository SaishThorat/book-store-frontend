import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BookCarousel = ({ books, onSelectBook }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h2>Recommendations</h2>
      <Slider {...settings}>
        {books.map((book, index) => (
          <div
            key={index}
            onClick={() => onSelectBook(book)}
            style={{
              padding: "5px",
            }}
          >
            <img
              src={book.coverImage}
              alt={book.title}
              style={{
                width: "100%",
                cursor: "pointer",
                paddingLeft: "3px",
                paddingRight: "3px",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BookCarousel;
