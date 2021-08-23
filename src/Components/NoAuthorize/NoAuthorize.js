import React from "react";
import img from "../NoAuthorize/assets/403.jpg";
const NoAuthorize = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        background: "#1B1B1B",
        height: "100vh",

        alignItems: "center",
      }}
    >
      <img src={img}></img>
    </div>
  );
};

export default NoAuthorize;
