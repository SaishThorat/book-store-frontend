import React, { useState } from "react";
import BookCarousel from "./BookCarousel";
import BookDetails from "./BookDetails";
import Review from "./Review";
import Layout from "../../layout/Layout";
import "../../assets/css/Recommender.css";

const Recommendations = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const books = [
    {
      title: "Harry Potter and the Cursed Child",
      author: "J.K. Rowling",
      description:
        "Harry Potter and the Cursed Child is a play written by Jack Thorne from an original story by Thorne, J.K. Rowling, and John Tiffany. The plot occurs nineteen years after the events of Rowling's novel Harry Potter and the Deathly Hallows.",
      coverImage:
        "https://www.shutterstock.com/image-vector/vector-open-book-icon-mobile-260nw-381125305.jpg",
    },
    {
      title: "Fantastic Beasts",
      author: "J.K. Rowling",
      description:
        'Fantastic Beasts is a series of films inspired by the book "Fantastic Beasts and Where to Find Them" by J.K. Rowling.',
      coverImage:
        "https://www.shutterstock.com/image-vector/vector-open-book-icon-mobile-260nw-381125305.jpg",
    },
    {
      title: "The Crimes of Grindelwald",
      author: "J.K. Rowling",
      description:
        "The Crimes of Grindelwald is a 2018 fantasy film directed by David Yates and written by J.K. Rowling.",
      coverImage:
        "https://www.shutterstock.com/image-vector/vector-open-book-icon-mobile-260nw-381125305.jpg",
    },
    {
      title: "The Crimes of Grindelwald",
      author: "J.K. Rowling",
      description:
        "The Crimes of Grindelwald is a 2018 fantasy film directed by David Yates and written by J.K. Rowling.",
      coverImage:
        "https://www.shutterstock.com/image-vector/vector-open-book-icon-mobile-260nw-381125305.jpg",
    },
  ];

  return (
    <div className="book-view">
      <Layout>
        <div style={{ padding: "20px" }}>
          <BookCarousel books={books} onSelectBook={setSelectedBook} />
          <BookDetails book={selectedBook} />
          <Review productId={1} />
        </div>
      </Layout>
    </div>
  );
};

export default Recommendations;
