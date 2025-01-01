import "./InputDataWithError.css";
import InputData from "../InputData/InputData"; // Подключаем компонент InputData

export default function InputDataWithError({
  value = "",
  typeOfData = "text",
  onInput, // обработчик изменения данных input
  nameOfInput = "",
  withIcon = true, // будет отображаться иконка
  iconName = "IconSearch.svg", // базовая иконка, если текст не введен
  onClickIcon, // обработчик на очистку значения
  withClearIcon = true, // будет отображаться иконка при введеном тексте
  closeIconPath = "CloseIconInInput.svg", // иконка, когда введен текст
  onClear, // обработчик события при нажатии на кнопку очищения
  placeholderValue = "",
  widthIcon = "15px",
  heightIcon = "15px",
  type = "text-with-icon",
  errorMessage = "", // сообщение об ошибке
}) {
  // Обработчик очистки
  const handleClearClick = () => {
    // Если есть обработчик от родителя и значение свойства для очистки
    if (onClear) {
      onClear(nameOfInput);
    }
  };

  return (
    <div className="section-input-with-error">


      <InputData
        value={value}
        typeOfData={typeOfData}
        onInput={onInput}
        nameOfInput={nameOfInput}
        withIcon={withIcon}
        iconName={iconName}
        onClickIcon={onClickIcon}
        withClearIcon={withClearIcon}
        closeIconPath={closeIconPath}
        onClear={handleClearClick}
        placeholderValue={placeholderValue}
        widthIcon={widthIcon}
        heightIcon={heightIcon}
        type={type}
      />      {/* Проверяем наличие ошибки */}
      {errorMessage && (
        <p className="error-message">{errorMessage}</p> // Отображаем сообщение об ошибке
      )}

    </div>
  );
}
