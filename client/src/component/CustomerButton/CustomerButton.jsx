import "./CustomerButton.css";

export default function CustomerButton({
  textValue = "Use",
  styleColor = "black",
  onClick,
  className = "",
  isEmpty = false,
  emptyStyleColor = 'grey',
  ...props
}) {
  if (isEmpty) {
    return (
      <button
        className={`customer-button ${emptyStyleColor} ${className}`}
      >
      </button>
    );
  }
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
