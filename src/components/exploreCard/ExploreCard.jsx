import React from "react";
import "./ExploreCard.css";
import { Link } from "react-router-dom";

const ExploreCard = ({ playlistId, poster, title, description }) => {
  const words = ["Discover", "Listen", "Explore"];
  const randomIndex = Math.floor(Math.random() * words.length);
  const shuffledWord = words[randomIndex];
  const urlSlug = title?.replaceAll(" ", "-").toLowerCase();

  const defaultDescription = `${shuffledWord} ${title.toLowerCase()} of the moment`;

  return (
    <Link to={`/${urlSlug}/${playlistId}`} className="explore-card">
      <div className="explore-card-image">
        <img src={poster} alt={title} />
      </div>
      <div className="explore-card-metadata-wrapper">
        <h6 className="explore-card-title">{title}</h6>
        <p className="explore-card-description">
          {description ?? defaultDescription}
        </p>
      </div>
    </Link>
  );
};

export default ExploreCard;
