import React, { useState, useEffect, useRef } from 'react';
import './CustomerSelect.css';

const CustomerSelect = ({ 
    options,
    filterKey,
    maxItems,
    placeholderValue,
    onSelect,
    defaultValue,
    iconPath = "SelectIcon.svg",
    iconClosePath = 'IconCloseSelect.svg'
}) => {
    const [inputValue, setInputValue] = useState(defaultValue ? defaultValue[filterKey] : "");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [isIconRotated, setIsIconRotated] = useState(false);
    const dropdownRef = useRef(null);

    // Устанавливаем значение по умолчанию при изменении defaultValue
    useEffect(() => {
        if (defaultValue) {
            setInputValue(defaultValue[filterKey]);
        } else {
            setInputValue("");
        }
    }, [defaultValue]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        const newFilteredOptions = options.filter(option => 
            option[filterKey]?.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(newFilteredOptions);
        setIsOptionsVisible(newFilteredOptions.length > 0);
    };

    const handleOptionClick = (option) => {
        setInputValue(option[filterKey]);
        setIsOptionsVisible(false);
        setIsIconRotated(false);
        onSelect(option);
    };

    const clearInput = () => {
        setInputValue("");
        setFilteredOptions(options);
        setIsOptionsVisible(false);
        setIsIconRotated(false);
        onSelect(null);
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

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="user-select-container" style={{ position: 'relative' }} ref={dropdownRef}>
            <input 
                type="text"
                value={inputValue}
                onChange={handleInputChange}
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
                    {filteredOptions.slice(0, maxItems).map((option) => (
                        <li 
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            className="option-item"
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