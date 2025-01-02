import React, { useState } from 'react';
import CustomerSelect from '../CustomerSelect/CustomerSelect';  // Импортируем основной компонент
import './CustomerSelectWithError.css';

export default function CustomerSelectWithError({ 
    options = [], 
    filterKey, 
    maxItems, 
    placeholderValue = "", 
    onSelect, 
    defaultValue, 
    iconPath = "SelectIcon.svg", 
    iconClosePath = "IconCloseSelect.svg", 
    onSelectItem,
    error = ""
}) {

    return (
        <div className="customer-select-with-error">
            <CustomerSelect
                options={options}
                filterKey={filterKey}
                maxItems={maxItems}
                placeholderValue={placeholderValue}
                onSelect={onSelect}
                defaultValue={defaultValue}
                iconPath={iconPath}
                iconClosePath={iconClosePath}
                onSelectItem={onSelectItem}
            />
            {error && <p className="error-message">{error}</p>} 
        </div>
    );
}
