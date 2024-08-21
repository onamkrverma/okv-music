import React from "react";
import "./Toggle.css";

const Toggle = ({ toggleList, activeToggle, setActiveToggle }) => {
  return (
    <div className="toggle-box">
      {toggleList.map((toggle) => (
        <button
          key={toggle.value}
          type="button"
          title={toggle.name}
          className="toggle-button"
          onClick={() => setActiveToggle(toggle.value)}
        >
          {toggle.name}
        </button>
      ))}
      <span
        className={`toggle-bg ${
          activeToggle === toggleList[1].value ? "translate-full" : ""
        }`}
      ></span>
    </div>
  );
};

export default Toggle;
