import React from "react";
// import "../assets/css/About.css";
import Layout from "../layout/Layout";

const About: React.FC = () => {
  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or comments, please don't hesitate to
          contact us at support@bookbazaar.com.
        </p>
      </div>
    </Layout>
  );
};

export default About;
