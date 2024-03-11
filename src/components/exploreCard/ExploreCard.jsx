import React from "react";
import "./ExploreCard.css";
import { Link } from "react-router-dom";

const ExploreCard = ({ item, dataType }) => {
  const words = ["Discover", "Listen", "Explore"];
  const randomIndex = Math.floor(Math.random() * words.length);
  const shuffledWord = words[randomIndex];

  const playlistId = dataType === "localFetch" ? item.playlistId : item.id;
  const urlSlug = (dataType === "localFetch" ? item.title : item.snippet.title)
    ?.replaceAll(" ", "-")
    .toLowerCase();
  const poster =
    dataType === "localFetch"
      ? item.poster
      : item.snippet.thumbnails.standard.url;
  const title = dataType === "localFetch" ? item.title : item.snippet.title;
  const description =
    dataType === "localFetch"
      ? `${shuffledWord} ${title.toLowerCase()} of the moment`
      : item.snippet.description;

  return (
    <Link
      to={`/playlistsongs/${urlSlug}/${playlistId}`}
      className="explore-card"
    >
      <div className="explore-card-image">
        <img src={poster} alt={title} />
      </div>
      <div className="explore-card-metadata-wrapper">
        <h6 className="explore-card-title">{title}</h6>
        <p className="explore-card-description">{description}</p>
      </div>
    </Link>
  );
};

export default ExploreCard;
