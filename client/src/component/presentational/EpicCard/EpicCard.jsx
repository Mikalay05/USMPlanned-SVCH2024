import "./EpicCard.css";

export default function EpicCard({
    textValue,
    styleColor = "#000", // Цвет текста, по умолчанию темно-серый
    backgroundColor = { r: 245, g: 242, b: 75 }, // Цвет фона (одинаковый для обоих состояний)
    alphaActive = "0.5", // Прозрачность для активного состояния
    alphaInactive = "0.3", // Прозрачность для неактивного состояния
    isActiveElement = false,
    descriptionText = "",
    children, // Дочерние элементы
    onClickElement, //Обработчик на нажатие на карточку
}) {
    // Функция для преобразования RGB и alpha в rgba строку
    const rgba = ({ r, g, b }, alpha) => `rgba(${r}, ${g}, ${b}, ${alpha})`;

    return (
        <div
            className={`customer-card-style ${isActiveElement ? 'active-customer-card' : 'inactive-customer-card'}`}
            style={{
                background: isActiveElement ? rgba(backgroundColor, alphaActive) : rgba(backgroundColor, alphaInactive)
            }}
            onClick={onClickElement}
        >
            {children ? (
                children // Если есть дочерние элементы, рендерим их
            ) : (
                <>
                    <div className="title-of-customer-card" style={{ color: styleColor }}>{textValue}</div>
                    {descriptionText && <div className="description-text">{descriptionText}</div>}
                </>
            )}
        </div>
    );
}