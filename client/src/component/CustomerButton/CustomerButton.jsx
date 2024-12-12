import './CustomerButton.css';

export default function CustomerButton({
    textValue = "Use",
    styleColor = 'black',
    onClick,
    className = '',
    ...props
}) {
    return (
        <button 
            className={`customer-button ${styleColor} ${className}`} 
            onClick={onClick}
            {...props}
        >
            {textValue}
        </button>
    );
}