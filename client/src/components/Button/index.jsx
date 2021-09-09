import React from "react";
import styles from "./styles.module.css";

export function Button({ text, onClick, color, bgColor, className, icon }) {
  const defaultStyles = { color: "white", background: "#c4b5fd" };
  const userStyles = Object.assign(
    {},
    color ? { color } : {},
    bgColor ? { backgroundColor: bgColor } : {}
  );

  const styleObject = { ...defaultStyles, ...userStyles };

  return (
    <button
      className={`${styles.button} ${className}`}
      style={styleObject}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
