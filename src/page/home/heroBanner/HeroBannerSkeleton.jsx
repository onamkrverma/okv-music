import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroBannerSkeleton = () => {
  return (
    <div className="heroBanner-wrapper ">
      <SkeletonTheme baseColor="#202020" highlightColor="#292828">
        <div className="hero-image-wrapper">
          <Skeleton height={"100%"} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default HeroBannerSkeleton;
