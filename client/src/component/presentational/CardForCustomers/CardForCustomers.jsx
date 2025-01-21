import React from "react";
import CustomerCard from "../CustomerCard/CustomerCard"; // Импортируем кастомную карточку
import "./CardForCustomers.css";

export default function CardForCustomers({
  customerId,
  customerName,
  onClick, // Обработчик клика на карточку
  isActive = false, // Флаг активности карточки
  
}) {
  return (
    <CustomerCard
      textValue={customerName} // Имя клиента отображается в заголовке
      styleColor="#333" // Цвет текста
      backgroundColor={{ r: 75, g: 245, b: 231 }} // Светло-голубой фон
      alphaActive="0.5" // Прозрачность для активного состояния
      alphaInactive="0.2" // Прозрачность для неактивного состояния
      isActiveElement={isActive} // Передаем активное состояние
      onClickElement={onClick} // Передаем обработчик клика
    />
  );
}
