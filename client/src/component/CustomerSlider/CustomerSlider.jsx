import React, { useState } from 'react';

import './CustomerSlider.css'

export default function CustomerSlider({
    items
}) {
    const [currentIndex, setCurrentIndex] = useState(1); // Центрируем второй элемент (index 1)

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="slider-container">
            <button className="slider-button prev" onClick={handlePrev}>←</button>

            <div className="slider">
                <div className={`slide ${currentIndex === 0 ? 'active' : 'passive'}`}>
                    {items[0]}
                </div>
                <div className={`slide ${currentIndex === 1 ? 'active' : 'passive'}`}>
                    {items[1]}
                </div>
                <div className={`slide ${currentIndex === 2 ? 'active' : 'passive'}`}>
                    {items[2]}
                </div>
            </div>

            <button className="slider-button next" onClick={handleNext}>→</button>
        </div>
    );
}