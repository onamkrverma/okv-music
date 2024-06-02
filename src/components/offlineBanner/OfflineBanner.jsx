import React from "react";
import "./OfflineBanner.css";
import { BsWifiOff } from "react-icons/bs";
const OfflineBanner = () => {
  return (
    <div className="offline-container absolute-center">
      <div className="offline-content-wrapper">
        <BsWifiOff size={80} />
        <h1>No Internet</h1>
        <p>Opps... You are currently offline</p>
        <p>Please verify your internet connection and try again</p>
      </div>
    </div>
  );
};

export default OfflineBanner;
