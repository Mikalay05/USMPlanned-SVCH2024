import React, { useState, useEffect, useRef } from 'react';
import './CustomerSelect.css';
const CustomerSelect = ({ 
    options = [],
    filterKey,
    maxItems,
    placeholderValue = "",
    onSelect,  // Оставим основной обработчик без изменений
    defaultValue,
    iconPath = "SelectIcon.svg",
    iconClosePath = 'IconCloseSelect.svg',
    
    // Обработчик при выборе элемента
    onSelectItem, 
}) => {

    const [inputValue, setInputValue] = useState(defaultValue ? defaultValue[filterKey] : "");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [isIconRotated, setIsIconRotated] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);  // Для выделения элемента
    const dropdownRef = useRef(null);
    useEffect(() => {
        if (defaultValue && defaultValue[filterKey]) {
            setInputValue(defaultValue[filterKey]); // Устанавливаем новое значение
        }
    }, [defaultValue, filterKey]);
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        const newFilteredOptions = options.filter(option => 
            option[filterKey]?.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredOptions(newFilteredOptions);
        setIsOptionsVisible(newFilteredOptions.length > 0);
        setSelectedIndex(-1); // Сброс выделения при изменении ввода
    };

    const handleOptionClick = (option) => {
        setInputValue(option[filterKey]);
        setIsOptionsVisible(false);
        setIsIconRotated(false);
        
        // Вызываем основной обработчик, если он передан
        if (typeof onSelect === "function") {
            onSelect(option);
        }

        // Вызываем обработчик выбора элемента, если он передан
        if (typeof onSelectItem === "function") {
            onSelectItem(option);  // Вызываем переименованный обработчик
        }
    };

    const clearInput = () => {
        setInputValue("");
        setFilteredOptions(options);
        setIsOptionsVisible(false);
        setIsIconRotated(false);
        // Вызываем основной обработчик, если он передан
        if (typeof onSelect === "function") {
            onSelect(null);
        }

        // Вызываем обработчик выбора элемента, если он передан
        if (typeof onSelectItem === "function") {
            onSelectItem(null);  // Вызываем переименованный обработчик
        }
    };

    const toggleOptionsVisibility = () => {
        setIsOptionsVisible(!isOptionsVisible);
        setIsIconRotated(!isIconRotated);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOptionsVisible(false);
            setIsIconRotated(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, filteredOptions.length - 1));
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (event.key === 'Enter' && selectedIndex >= 0) {
            const selectedOption = filteredOptions[selectedIndex];
            handleOptionClick(selectedOption);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown); // Добавляем обработчик клавиш
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [filteredOptions, selectedIndex]);

    return (
        <div className="user-select-container" style={{ position: 'relative' }} ref={dropdownRef}>
            <input 
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={toggleOptionsVisibility}  // Показываем список при фокусе на поле
                placeholder={placeholderValue}
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
                style={{ opacity: inputValue ? 0.5 : 1 }}
            />
            {isOptionsVisible && filteredOptions.length > 0 && (
                <ul className="options-list">
                    {filteredOptions.slice(0, maxItems).map((option, index) => (
                        <li 
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            className={`option-item ${selectedIndex === index ? 'selected' : ''}`} // Добавляем стиль для выбранного элемента
                        >
                            {option[filterKey]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomerSelect;
