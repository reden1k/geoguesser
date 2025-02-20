import React from "react";
import "./styles.scss";

const Button = ({ onClick, text, disabled }) => (
  <button className="custom-button" onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

export default Button;
