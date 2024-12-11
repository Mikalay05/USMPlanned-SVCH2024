import './Notification.css'

export default function Notification({open, text, iconName, onClose}) {
    if (!open) {
        return null;
    }

    return (
        <div className="notification">
            <h4>{text}</h4>
            <img src={`/${iconName}`} alt="Notification icon" onClick={onClose}/>
        </div>
    );
}