import React from "react";
import Header from "../../components/header/Header";
import "./pageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <Header />
      <div className="page-not-found-wrapper">
        <div className="page-not-found-wrapper-text-wrapper">
          <h1>404</h1>
          <p>Opps... This page could not be found!</p>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
