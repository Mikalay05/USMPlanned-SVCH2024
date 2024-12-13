import React, { useState, useEffect, useRef } from 'react';
import './CustomerSelect.css';

const CustomerSelect = ({ options, filterKey, maxItems, placeholderValue, iconPath = "SelectIcon.svg", iconClosePath = 'IconCloseSelect.svg' }) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOptionsVisible, setIsOptionsVisible] = useState(false); // Для управления видимостью списка
    const [isIconRotated, setIsIconRotated] = useState(false); // Для отслеживания состояния иконки
    const dropdownRef = useRef(null); // Ссылка на выпадающий список

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        // Фильтруем опции на основе введенного текста
        const newFilteredOptions = options.filter(option => 
            option[filterKey]?.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(newFilteredOptions);

        // Показываем список, если есть хотя бы одна соответствующая опция
        setIsOptionsVisible(newFilteredOptions.length > 0);
    };

    const handleOptionClick = (option) => {
        setInputValue(option[filterKey]); // Устанавливаем значение выбранного поля
        setIsOptionsVisible(false); // Скрываем список после выбора
        setIsIconRotated(false); // Сбрасываем состояние иконки
    };

    const clearInput = () => {
        setInputValue("");
        setFilteredOptions(options); // Сбрасываем фильтрацию к полному списку
        setIsOptionsVisible(false); // Скрываем список
        setIsIconRotated(false); // Сбрасываем состояние иконки
    };

    const toggleOptionsVisibility = () => {
        setIsOptionsVisible(!isOptionsVisible); // Переключаем видимость списка
        setIsIconRotated(!isIconRotated); // Переключаем состояние иконки
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOptionsVisible(false); // Скрываем список при клике вне
            setIsIconRotated(false); // Сбрасываем состояние иконки
        }
    };

    useEffect(() => {
        // Добавляем обработчик события при монтировании компонента
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Удаляем обработчик события при размонтировании компонента
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="user-select-container" style={{ position: 'relative' }} ref={dropdownRef}>
            <input 
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={`${placeholderValue}`}
                className="user-select-input"
            />
            {inputValue && (
                <img 
                    onClick={clearInput} 
                    src={`/${iconClosePath}`} 
                    className="iconClose" 
                    alt="Clear input" 
                />
            )}
            <img 
                src={`/${iconPath}`} 
                onClick={toggleOptionsVisibility} 
                className={`iconSelected ${isIconRotated ? 'rotated' : ''}`} 
                alt="Toggle options"
                style={{ opacity: inputValue ? 0.5 : 1 }} // Устанавливаем прозрачность
            />
            {isOptionsVisible && filteredOptions.length > 0 && (
                <ul className="options-list">
                    {filteredOptions.slice(0, maxItems).map((option) => (
                        <li 
                            key={option.id} // Используем id как ключ
                            onClick={() => handleOptionClick(option)} // Обновляем input при клике
                            className="option-item"
                        >
                            {option[filterKey]} {/* Показываем значение указанного поля */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomerSelect;