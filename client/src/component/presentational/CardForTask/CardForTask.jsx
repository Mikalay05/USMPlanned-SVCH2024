import "./CardForTask.css";
import CustomerCard from "../CustomerCard/CustomerCard"; // Импортируем кастомную карточку
import React from "react";
export default function CardForTask({
  dataOfObject = {},
  onClick = () => {},
  isActive = false,
  isEmpty = false,
  key
}) {
  const colorObject = { r: 153, g: 0, b: 255 };
  const taskData = (
    <div className="taskData">
        <img src={dataOfObject.urgency_status.img} alt={dataOfObject.urgency_status.name} />
        <p>{dataOfObject.name}</p>
        <p>Сроки {dataOfObject.deadline}</p>
        <p>Cтатус</p>
    </div>
  )
  if (isEmpty) {
    return (
      <CustomerCard
        key={key}
        styleColor="#333" // Цвет текста
        backgroundColor={colorObject} // Светло-голубой фон
        alphaActive="0.5" // Прозрачность для активного состояния
        alphaInactive="0.2" // Прозрачность для неактивного состояния
        isActiveElement={false} // Передаем активное состояние
        onClickElement={onClick} // Передаем обработчик клика
      />
    );
  }
  return (
    <CustomerCard
      key={key}
      styleColor="#333" // Цвет текста
      backgroundColor={colorObject} // Светло-голубой фон
      alphaActive="0.5" // Прозрачность для активного состояния
      alphaInactive="0.2" // Прозрачность для неактивного состояния
      isActiveElement={isActive} // Передаем активное состояние
      onClickElement={onClick} // Передаем обработчик клика
    >
        {taskData}
    </CustomerCard>
  );
}
