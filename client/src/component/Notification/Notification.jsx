import './Notification.css'
import { useEffect } from 'react';

export default function Notification({open, text, iconName, timeClose, onClose}) {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                onClose();
            }, timeClose); // Закрыть уведомление через 3 секунды

            return () => clearTimeout(timer); // Очистить таймер при размонтировании
        }
    }, [open, onClose]);

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