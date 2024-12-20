import './CloseIcon.css';

export default function CloseIcon({
    size = 24,          // Длина линии
    thickness = 2,      // Толщина линий
    color = 'black',     // Цвет линий
    top = 20,           // Отступ сверху
    left = 10,          // Отступ слева
    borderRadius = 2    // Радиус закругления углов
}) {
    return (
        <div
            className='close-icon-component'
            style={{
                top: `${top}px`,
                left: `${left}px`,
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <div
                className="line"
                style={{
                    width: `${size}px`,
                    height: `${thickness}px`,
                    backgroundColor: color,
                    borderRadius: `${borderRadius}px`, // Добавляем закругление
                    transform: 'rotate(45deg)',
                }}
            ></div>
            <div
                className="line"
                style={{
                    width: `${size}px`,
                    height: `${thickness}px`,
                    backgroundColor: color,
                    borderRadius: `${borderRadius}px`, // Добавляем закругление
                    transform: 'rotate(-45deg)',
                }}
            ></div>
        </div>
    );
}
