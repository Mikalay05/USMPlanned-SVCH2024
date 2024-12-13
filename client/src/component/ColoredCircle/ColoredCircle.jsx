import "./ColoredCircle.css";

export default function ColoredCircle({
    size = "15px",
    colorCircle = { r: 0, g: 0, b: 0 }
}) {
    // Функция для преобразования RGB в строку
    const rgbColor = `rgb(${colorCircle.r}, ${colorCircle.g}, ${colorCircle.b})`;

    return (
        <div
            className="colored-circle"
            style={{
                width: size,
                height: size,
                backgroundColor: rgbColor,
                borderRadius: '50%', // Делает круг
            }}
        />
    );
}