import "./ColoredCircle.css";

export default function ColoredCircle({
    size = "15px",
    RGBColorCircle = { r: 0, g: 0, b: 0 }
}) {
    // Функция для преобразования RGB в строку
    const rgbColor = `rgb(${RGBColorCircle.r}, ${RGBColorCircle.g}, ${RGBColorCircle.b})`;

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