import React from "react";
import "./HeroBanner.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import HeroBannerSkeleton from "./HeroBannerSkeleton";
import { useDispatch } from "react-redux";
import { addSongInfo } from "../../../reduxtool/slice/currentSongSlice";

const HeroBanner = ({ songsData, isLoading }) => {
  const dispatch = useDispatch();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 426,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const handleRedirect = (videoId) => {
    dispatch(
      addSongInfo({
        id: videoId,
        miniPlayerActive: false,
      })
    );
  };

  return (
    <div className="heroBanner-section container">
      {isLoading || !songsData ? (
        <HeroBannerSkeleton />
      ) : (
        <Slider {...settings}>
          {songsData?.slice(0, 5).map((songs) => (
            <div
              className="heroBanner-wrapper "
              key={songs.etag}
              onClick={() => handleRedirect(songs.snippet.resourceId.videoId)}
            >
              <div className="hero-image-wrapper">
                <img
                  src={
                    songs.snippet.thumbnails?.maxres
                      ? songs.snippet?.thumbnails.maxres?.url
                      : songs.snippet?.thumbnails.high?.url
                  }
                  className="hero-image"
                  alt={songs.snippet.title + " (audio mp3)" || "hero poster"}
                />
              </div>
              <div className="image-shadow"></div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HeroBanner;
