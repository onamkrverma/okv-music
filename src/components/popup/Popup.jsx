import React from "react";
import "./Popup.css";
import { RxCross2 } from "react-icons/rx";
import { PiMicrophoneFill } from "react-icons/pi";
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
  variant,
  isListening,
  startListening,
  stopListening,
  errorMessage,
}) => {
  return (
    <div
      className={`popup-wrapper absolute-center ${isPopup ? "block" : "hide"}`}
    >
      <div
        className="popup-overlayer"
        onClick={() => {
          setIsPopup(false),
            stopListening && stopListening({ isClearResult: true });
        }}
      ></div>
      <div className="popup">
        <button
          type="button"
          title="close"
          className="popup-close-btn cur-pointer"
          onClick={() => {
            setIsPopup(false),
              stopListening && stopListening({ isClearResult: true });
          }}
        >
          <RxCross2 size={25} />
        </button>
        {variant !== "voice-search" ? (
          <>
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
          </>
        ) : (
          <div className="popup-content">
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <button
              type="button"
              className="mic-btn absolute-center cur-pointer"
              style={{ backgroundColor: isListening ? "red" : "" }}
              onClick={() =>
                isListening
                  ? stopListening && stopListening({})
                  : startListening && startListening()
              }
            >
              <PiMicrophoneFill size={30} />
            </button>

            <small>
              {isListening
                ? "Listening... Click on mic to stop"
                : "Click on mic then speak"}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
