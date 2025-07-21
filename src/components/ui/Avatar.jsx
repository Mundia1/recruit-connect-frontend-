import React from "react";

const Avatar = ({ children, size = 40 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: "#e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: size / 2,
      color: "#374151",
    }}
    className="avatar"
  >
    {children}
  </div>
);

export default Avatar;