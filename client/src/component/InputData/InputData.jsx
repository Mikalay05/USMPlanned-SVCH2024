import "./InputData.css";
import { useState } from "react";

export default function InputData({
    value = "",
    placeholderValue,
    iconName,
    onClickIcon,
    onClear, // Callback для очистки поля
    widthIcon = "15px",
    heightIcon = "15px",
    type = "text",
    closeIconPath = "CloseIconInInput.svg" // Путь к иконке для очистки (по умолчанию CloseIcon.svg)
}) {
    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleClear = () => {
        setInputValue(""); // Очищаем поле
        if (onClear) onClear(); // Вызываем callback при очистке, если передан
    };

    return (
        <div className="input-style-section">
            {inputValue ? (
                <img
                    width={widthIcon}
                    height={heightIcon}
                    src={`/${closeIconPath}`} // Путь к иконке для очистки
                    alt="Close"
                    onClick={handleClear} // Очистка поля по клику
                />
            ) : (
                <img
                    width={widthIcon}
                    height={heightIcon}
                    onClick={onClickIcon}
                    src={`/${iconName}`}
                    alt="icon"
                />
            )}
            <input
                type={type}
                placeholder={placeholderValue}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
}
