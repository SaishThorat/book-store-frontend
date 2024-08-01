import React from "react";
import "../assets/css/About.css";
import Layout from "../layout/Layout";

const About: React.FC = () => {
  return (
    <Layout>
      <div className="about-container">
        <h1>About BookBazaar</h1>
        <p>
          Welcome to BookBazaar, your number one source for all books. We're
          dedicated to providing you the best of books, with a focus on
          dependability, customer service, and variety.
        </p>
        <h2>Our Story</h2>
        <p>
          Founded in [Year] by [Founder's Name], BookBazaar has come a long way
          from its beginnings. When [Founder's Name] first started out,
          [his/her/their] passion for [passion], drove them to start their own
          business.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide quality books that cater to the needs of
          book lovers around the world. We hope you enjoy our products as much
          as we enjoy offering them to you.
        </p>
      </div>
    </Layout>
  );
};

export default About;
