import "./CardForStory.css";
import CustomerCard from "../CustomerCard/CustomerCard";
import React, { useState } from "react";

export default function CardForStory({
  dataOfObject = {},
  onClick,
  isActive = false,
  isEmpty = false,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);

  if (isEmpty) {
    return (
      <div className="card-container" onClick={onClick}>
        <CustomerCard
          textValue=""
          styleColor="#333"
          backgroundColor={{ r: 0, g: 255, b: 38 }}
          alphaActive="0.5"
          alphaInactive="0.2"
          isActiveElement={false}
        />
      </div>
    );
  }

  return (
    <div
      className={`card-container ${isFlipped ? "flipped" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="card-front">
        <CustomerCard
          textValue={dataOfObject.name}
          styleColor="#333"
          backgroundColor={{ r: 0, g: 255, b: 38 }}
          alphaActive="0.5"
          alphaInactive="0.2"
          isActiveElement={isActive}
        />
      </div>
      <div className="card-back">
        <CustomerCard
          textValue={dataOfObject.description || "No description"}
          styleColor="#333"
          backgroundColor={{ r: 0, g: 200, b: 150 }}
          alphaActive="0.7"
          alphaInactive="0.3"
          isActiveElement={isActive}
        />
      </div>
    </div>
  );
}
