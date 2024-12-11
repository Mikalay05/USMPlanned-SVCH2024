import "./InputData.css"

export default function InputData({value, placeholderValue, widthIcon = "15px",heightIcon = "15px"}) {
    return (
        <div className="input-style-section">
            <img width={widthIcon} height={heightIcon} src="/Login-Icon.svg"/> 
            <input placeholder={placeholderValue}>{value}</input>
        </div>
    )
}