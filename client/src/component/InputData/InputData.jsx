import "./InputData.css"

export default function InputData({value, placeholderValue,iconName, widthIcon = "15px",heightIcon = "15px"}) {
    return (
        <div className="input-style-section">
            <img width={widthIcon} height={heightIcon} src={`/${iconName}`}/> 
            <input placeholder={placeholderValue}>{value}</input>
        </div>
    )
}