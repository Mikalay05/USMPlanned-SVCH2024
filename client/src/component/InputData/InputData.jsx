import "./InputData.css";
import { useState, useEffect } from "react";

export default function InputData({
  value = "",
  typeOfData = 'text',
  placeholderValue = '',
  iconName,
  onClickIcon,
  widthIcon = "15px",
  heightIcon = "15px",
  type = "text-with-icon", 
  nameOfInput,
  onInput,
  closeIconPath = "CloseIconInInput.svg",
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleClear = () => {
    setInputValue(""); 
  };
  //Обработчик изменения значения inputa
  const handleInput = (e) => {
    //Получаю новое значение
    const newValue= e.target.value;
    //Устанавливаю новое значение
    setInputValue(newValue);

    //Если есть обработчик ввода, то вызываем его передовая событие
    if(onInput)
    {
      onInput(e);
    }
  }
  return (
    <div className="input-style-section">
      {type !== "text" && ( 
        inputValue ? (
          <img
            width={widthIcon}
            height={heightIcon}
            src={`/${closeIconPath}`}
            alt="Close"
            onClick={handleClear}
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
        type={type === "text" ? "text" : "text"}
        placeholder={placeholderValue}
        value={inputValue}
        onInput={handleInput}
        name={nameOfInput}
        className={type === "text" ? "input-no-icon" : "input-with-icon"}
      />
    </div>
  );
}
