import React from "react";
import "./Popup.css";
import { RxCross2 } from "react-icons/rx";
const Popup = ({
  isPopup,
  setIsPopup,
  title,
  subtitle,
  primaryBtnText,
  secondaryBtnText,
  handlePrimaryBtn,
  handleSecondaryBtn,
  Icon,
}) => {
  return (
    <div
      className={`popup-wrapper absolute-center ${isPopup ? "block" : "hide"}`}
    >
      <div className="popup-overlayer" onClick={() => setIsPopup(false)}></div>
      <div className="popup">
        <button
          type="button"
          title="close"
          className="popup-close-btn cur-pointer"
          onClick={() => setIsPopup(false)}
        >
          <RxCross2 size={25} />
        </button>
        <div className="popup-content">
          <span className="popup-icon">{Icon}</span>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <div className="popup-btn-wrapper absolute-center">
          {secondaryBtnText ? (
            <button
              type="button"
              title={secondaryBtnText}
              className="popup-secondary-btn"
              onClick={handleSecondaryBtn}
            >
              {secondaryBtnText}
            </button>
          ) : null}
          <button
            type="button"
            title={primaryBtnText}
            className="popup-primary-btn"
            onClick={handlePrimaryBtn}
          >
            {primaryBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
