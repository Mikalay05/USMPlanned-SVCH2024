import "./InputData.css";
import { useState, useEffect } from "react";

export default function InputData({
  textValue = "",
  typeOfData = 'text',
  onInput, //обработчик изменения данных input
  nameOfInput = '',

  withIcon = true, //Будет отображаться иконка
  iconName = 'IconSearch.svg', //Базовая иконка, если текст не введен
  onClickIcon, // обработчик на очистку значения

  withClearIcon = true, //Будет отображаться иконка при введенои тексте
  closeIconPath = "CloseIconInInput.svg", //Иконка, когда введен текст
  onClear, //обработчик собития при нажати на кнопку очищения

  placeholderValue = '',
  widthIcon = "15px",
  heightIcon = "15px",
  type = "text-with-icon", 
  
}) {
  //Обработчик очистки
  const handleClearClick = () => {
    //Если есть обработчик от родители и значения свойство для очистки -
    if(onClear&& nameOfInput) {
      onClear(nameOfInput)
    }
  }
  return (
    <div className="input-style-section">
      {withIcon && ( 
        (textValue && withClearIcon )? (
          <img
            width={widthIcon}
            height={heightIcon}
            src={`/${closeIconPath}`}
            alt="Close"
            onClick={handleClearClick}
            
          />
        ) : (
          <img
            width={widthIcon}
            height={heightIcon}
            onClick={onClickIcon}
            src={`/${iconName}`}
            alt="icon"
          />
        )
      )}
      <input
        type={typeOfData}
        placeholder={placeholderValue}
        defaultValue={textValue}
        onInput={onInput}
        name={nameOfInput}
        className={type === "text" ? "input-no-icon" : "input-with-icon"}
      />
    </div>
  );
}
