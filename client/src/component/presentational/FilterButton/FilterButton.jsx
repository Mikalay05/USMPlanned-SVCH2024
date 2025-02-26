import './FilterButton.css';

export default function FilterButton({
    textValue = '',
    isActive = false, 
    onClick = ()=> {},
}) {
    return (
        <button className={`customer-FilterButton ${isActive ? 'active' : ''}`} onClick={onClick}>
            {textValue}
        </button>
    );
}
