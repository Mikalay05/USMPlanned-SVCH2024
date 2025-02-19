import "./CardForStory.css";
import CustomerCard from "../CustomerCard/CustomerCard";
import React from "react";

export default function CardForStory({
  dataOfObject = {},
  onClick,
  isActive = false,
  isEmpty = false,
  nameOfUser = "User",
}) {
  const resultOfDescription = `As a ${nameOfUser}, I want ${dataOfObject.name}, so that ${dataOfObject.description}`
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
    <div className="card-wrapper">
      <div className="card-container"  onClick={onClick}>
        {/* Лицевая сторона */}
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

        {/* Обратная сторона */}
        <div className="card-back">
          <CustomerCard
            textValue={resultOfDescription}
            styleColor="#333"
            backgroundColor={{ r: 0, g: 200, b: 150 }}
            alphaActive="0.7"
            alphaInactive="0.3"
            isActiveElement={isActive}
          />
        </div>
      </div>
    </div>
  );
}
