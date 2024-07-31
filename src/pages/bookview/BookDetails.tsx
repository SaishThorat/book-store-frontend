import React from "react";

const BookDetails = ({ book }) => {
  if (!book) return null;

  return (
    <div
      style={{
        display: "flex",
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#e0f7fa",
      }}
    >
      <img
        src={book.coverImage}
        alt={book.title}
        style={{ width: "200px", marginRight: "20px" }}
      />
      <div>
        <h3>Title: {book.title}</h3>
        <p>
          <b>Author:</b> {book.author}
        </p>
        <p>
          <b>Description:</b> {book.description}
        </p>
        <button style={{ marginRight: "10px" }}>Buy</button>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default BookDetails;
