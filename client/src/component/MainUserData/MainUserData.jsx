import './MainUserData.css';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../store/slices/userSlice"; // Экшен для обновления пользователя
import InputDataWithError from "../InputDataWithError/InputDataWithError"; // Компонент для ввода с ошибкой
import CustomerButton from "../CustomerButton/CustomerButton"; // Кнопка с кастомным стилем
import Notification from "../Notification/Notification"; // Компонент для уведомлений

export default function MainUserData() {
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    login: currentUser?.login || "",
    phone: currentUser?.phone || "",
  });

  const [formErrors, setFormErrors] = useState({
    loginErr: "",
    phoneErr: "",
  });

  const [notificationObject, setNotificationObject] = useState({
    textValue: "",
    color: "#fff",
    openModal: false,
  });

  const handleSetNotification = (message, color = "#F5F24B") => {
    setNotificationObject({
      textValue: message,
      color: color,
      openModal: true,
    });
  };

  const handleOnCloseNotification = () => {
    setNotificationObject({
      ...notificationObject,
      openModal: false,
    });
  };

  const handleInInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClearInput = (name) => {
    setFormData({
      ...formData,
      [name]: "",
    });
  };

  const handleOnUpdateButton = async () => {
    try {
      await dispatch(updateUser(formData)).unwrap(); // 
      handleSetNotification("User data updated successfully", "#00FF00");
    } catch (err) {
      handleSetNotification(err.message, "#F00");
      if (err.details) {
        setFormErrors(err.details); // Отображаем ошибки валидации
      } else {
        console.error("Ошибка обновления данных:", err.message);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section-user-data">
      <Notification
        onClose={handleOnCloseNotification}
        text={notificationObject.textValue}
        open={notificationObject.openModal}
        bgColor={notificationObject.color}
      />
      <h1 className="title-user-data">Personal</h1>

      <div className="inputs-user-data">
        <InputDataWithError
          errorMessage={formErrors.loginErr}
          onClear={handleClearInput}
          iconName="Login-Icon.svg"
          placeholderValue="Login"
          nameOfInput="login"
          value={formData.login}
          onInput={handleInInput}
        />
        <InputDataWithError
          errorMessage={formErrors.phoneErr}
          onClear={handleClearInput}
          iconName="Login-Icon.svg"
          placeholderValue="Phone Number"
          nameOfInput="phone"
          value={formData.phone}
          onInput={handleInInput}
        />
        <CustomerButton
          textValue="Save"
          onClick={handleOnUpdateButton}
        />
        
      </div>
    </section>
  );
}
