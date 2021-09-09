import React from "react";
import "./styles.css";

export function Heading({ title, children }) {
  return (
    <div className="heading">
      <div className="heading__name">{title}</div>
      <div>{children}</div>
    </div>
  );
}
