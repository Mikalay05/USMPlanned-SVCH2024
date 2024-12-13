import "./CustomerCard.css";

export default function CustomerCard({
    textValue,
    styleColor = "#000", // Цвет текста, по умолчанию темно-серый
    backgroundColorActive = "rgba(75, 245, 231, 0.50)", // Цвет фона для активного состояния
    backgroundColorInactive = "rgba(75, 245, 231, 0.20)", // Цвет фона для неактивного состояния
    isActiveElement = false,
    descriptionText = "",
}) {
    return (
        <div className={`customer-card-style ${isActiveElement ? 'active' : 'inactive'}`} style={{ background: isActiveElement ? backgroundColorActive : backgroundColorInactive }}>
            <div className="title-of-customer-card" style={{ color: styleColor }}>{textValue}</div>
            {descriptionText && <div className="description-text">{descriptionText}</div>}
        </div>
    );
}