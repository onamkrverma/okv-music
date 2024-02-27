import React from "react";
import "./ExploreList.css";
import ExploreCard from "../exploreCard/ExploreCard";
import ExploreCardSkeleton from "../exploreCard/ExploreCardSkeleton";

const ExploreList = ({ title, exploreData, isLoading, dataType }) => {
  return (
    <div className="explore-list-container">
      <h1>{title}</h1>
      <div className="explore-card-list">
        {!isLoading && exploreData.length ? (
          exploreData?.map((item, index) => (
            <ExploreCard key={index} item={item} dataType={dataType} />
          ))
        ) : (
          <ExploreCardSkeleton amount={5} />
        )}
      </div>
    </div>
  );
};

export default ExploreList;
