import "./InputData.css";
import { useState, useEffect } from "react";

export default function InputData({
  value = "",
  typeOfData = 'text',
  onInput, //обработчик изменения данных input
  nameOfInput = '',

  withIcon = true, //Будет отображаться иконка
  iconName = 'IconSearch.svg', //Базовая иконка, если текст не введен

  withClearIcon = true, //Будет отображаться иконка при введенои тексте
  closeIconPath = "CloseIconInInput.svg", //Иконка, когда введен текст
  onClear = () => {}, //обработчик собития при нажати на кнопку очищения

  placeholderValue = '',
  widthIcon = "15px",
  heightIcon = "15px",
  type = "text-with-icon", 
  
}) {

  //FIXME
  /*hook.js:608 Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`. Error Component Stack
    at input (<anonymous>)
    at div (<anonymous>)
    at InputData (InputData.jsx:5:1)
    at section (<anonymous>)
    at ProjectComponent (ProjectComponent.jsx:13:1)
    at ProjectPage (ProjectPage.jsx:12:1)
    at App (App.js:13:1)
*/
  return (
    <div className="input-style-section">
      {withIcon && ( 
        (value && withClearIcon )? (
          <img
            width={widthIcon}
            height={heightIcon}
            src={`/${closeIconPath}`}
            alt="Close"
            onClick={()=>{onClear(nameOfInput)}}
            
          />
        ) : (
          <img
            width={widthIcon}
            height={heightIcon}
            src={`/${iconName}`}
            alt="icon"
          />
        )
      )}
      <input
        type={typeOfData}
        placeholder={placeholderValue}
        value={value}
        onInput={onInput}
        name={nameOfInput}
        className={type === "text" ? "input-no-icon" : "input-with-icon"}
      />
    </div>
  );
}
