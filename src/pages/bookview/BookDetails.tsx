
const BookDetails = ({ book }) => {
  if (!book) return null;

  return (
    <div
      style={{
        display: "flex",
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#cff5fea0",
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
        <button
          style={{ marginRight: "10px" }}
          className="btn btn-light ms-1 btn-outline-dark m-1"
        >
          Buy
        </button>
        <button className="btn btn-light ms-1 btn-outline-dark m-1">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
