import "./InputData.css";
import { useState, useEffect } from "react";

export default function InputData({
  value = "",
  placeholderValue,
  iconName,
  onClickIcon,
  onClear,
  widthIcon = "15px",
  heightIcon = "15px",
  type = "text-with-icon", 
  closeIconPath = "CloseIconInInput.svg",
  onChange, // Новый пропс для передачи изменений родительскому компоненту
}) {
  const [inputValue, setInputValue] = useState(value);

  // Эффект для обновления локального состояния, если значение изменяется в родительском компоненте
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event.target.value); // Отправляем изменения в родительский компонент
    }
  };

  const handleClear = () => {
    setInputValue(""); 
    if (onClear) onClear(); 
  };

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
        onChange={handleInputChange}
        className={type === "text" ? "input-no-icon" : "input-with-icon"}
      />
    </div>
  );
}
