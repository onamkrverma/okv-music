import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExploreCardSkeleton = ({ amount }) => {
  const arrayCount = Array(amount).fill(0);

  return arrayCount.map((val, index) => (
    <SkeletonTheme baseColor="#202020" highlightColor="#292828" key={index}>
      <div className="explore-card">
        <div className="explore-card-image">
          <Skeleton height={"150px"} />
          <div className="explore-card-metadata-wrapper">
            <h6 className="explore-card-title">
              <Skeleton height={"8px"} count={1} />
            </h6>
            <p className="explore-card-description">
              <Skeleton height={"8px"} count={1} />
            </p>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  ));
};

export default ExploreCardSkeleton;
