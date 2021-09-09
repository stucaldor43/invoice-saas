import React, { useState } from "react";

export default function Switch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: "2",
          display: "flex",
          opacity: "0",
        }}
      >
        <label htmlFor="switch" style={{ width: "calc(3rem - 13px)" }}></label>
        <input
          id="switch"
          onChange={() => setEnabled(!enabled)}
          type="checkbox"
          name="Enabled"
        />
      </div>
      <div
        style={{
          position: "relative",
          width: "2.5rem",
          height: "1.25rem",
          backgroundColor: enabled ? "blue" : "#bdc5cd",
          borderRadius: "20rem",
        }}
      >
        <span
          style={{
            position: "absolute",
            width: "1rem",
            height: "1rem",
            backgroundColor: "#fff",
            borderRadius: "50%",
            transition: "transform 0.3s ease",
            transform: `translate(${
              !enabled ? "2px" : "calc(1.5rem - 2px)"
            }, 2px )`,
          }}
        ></span>
      </div>
    </div>
  );
}
