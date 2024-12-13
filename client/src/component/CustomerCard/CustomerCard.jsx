import "./CustomerCard.css";

export default function CustomerCard({
    textValue,
    styleColor = "#000", // Цвет текста, по умолчанию темно-серый
    backgroundColor = { r: 75, g: 245, b: 231 }, // Цвет фона (одинаковый для обоих состояний)
    alphaActive = 0.5, // Прозрачность для активного состояния
    alphaInactive = 0.2, // Прозрачность для неактивного состояния
    isActiveElement = false,
    descriptionText = "",
    children // Дочерние элементы
}) {
    // Функция для преобразования RGB и alpha в rgba строку
    const rgba = ({ r, g, b }, alpha) => `rgba(${r}, ${g}, ${b}, ${alpha})`;

    return (
        <div
            className={`customer-card-style ${isActiveElement ? 'active' : 'inactive'}`}
            style={{
                background: isActiveElement ? rgba(backgroundColor, alphaActive) : rgba(backgroundColor, alphaInactive)
            }}
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