import React from "react";
import "./Home.css";
export default function Home({ currentUser }) {
  return (
    <div className="HomeContainer">
      <h1>
        Welcome, <span style={{ color: "blue" }}>{currentUser.userName}</span>
      </h1>
      <h3>Please select a chat to Start messaging. . .</h3>
    </div>
  );
}
