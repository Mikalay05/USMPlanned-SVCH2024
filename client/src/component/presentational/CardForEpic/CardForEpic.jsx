import "./CardForEpic.css";
import CustomerCard from "../CustomerCard/CustomerCard"; // Импортируем кастомную карточку
import React from "react";

export default function CardForEpic({
  dataOfObject = {},
  onClick, // Обработчик клика на карточку
  isActive = false, // Флаг активности карточки
  isEmpty = false,
  key,
}) {
  if (isEmpty) {
    return (
      <CustomerCard
        key={key}
        textValue="" // Имя клиента отображается в заголовке
        styleColor="#333" // Цвет текста
        backgroundColor={{ r: 245, g: 242, b: 75 }} // Светло-голубой фон
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
      textValue={dataOfObject.name} // Имя клиента отображается в заголовке
      styleColor="#333" // Цвет текста
      backgroundColor={{ r: 245, g: 242, b: 75 }} // Светло-голубой фон
      alphaActive="0.5" // Прозрачность для активного состояния
      alphaInactive="0.2" // Прозрачность для неактивного состояния
      isActiveElement={isActive} // Передаем активное состояние
      onClickElement={onClick} // Передаем обработчик клика
    />
  );
}
