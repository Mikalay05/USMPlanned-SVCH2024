import "./InputData.css";

export default function InputData({ value, placeholderValue, iconName, onClickIcon, widthIcon = "15px", heightIcon = "15px", type = "text" }) {
    return (
        <div className="input-style-section">
            <img 
                width={widthIcon} 
                height={heightIcon} 
                onClick={onClickIcon} 
                src={`/${iconName}`} 
                alt="icon" 
            />
            <input 
                type={type}
                placeholder={placeholderValue} 
                value={value} 
            />
        </div>
    );
}