import React from "react";
import "./card.css";
export default function Card({ styles }) {
  return (
    <div className="card">
      <div className="details">
        <img src="" alt="dummy img" style={styles} />
        <p>artist name</p>
        <p>Artist</p>
      </div>
      <div className="btn">
        <button type="click">
          <span>&#9654;</span>
        </button>
      </div>
    </div>
  );
}
