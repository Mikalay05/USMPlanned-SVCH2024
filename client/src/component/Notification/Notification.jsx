import './Notification.css';
import { useEffect } from 'react';

export default function Notification({
  open = false,
  text,
  iconName = 'close.png',
  timeClose = 3000,
  onClose,
  bgColor = '#F5F24B', // Параметр для указания цвета фона
}) {
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
    <div className="notification" style={{ backgroundColor: bgColor }}>
      <h4>{text}</h4>
      <img src={`/${iconName}`} alt="Notification icon" onClick={onClose} />
    </div>
  );
}
