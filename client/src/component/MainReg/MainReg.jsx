import "./MainReg.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импорт useNavigate

import { useDispatch } from "react-redux"; // Для вызова action
import { registrationUser } from "../../store/slices/userSlice"; // Импорт экшена

import CustomerButton from "../CustomerButton/CustomerButton";
import CustomerSelectWithError from "../CustomerSelectWithError/CustomerSelectWithError"; // Импортируем новый компонент с ошибкой
import InputDataWithError from "../InputDataWithError/InputDataWithError"; // Импортируем компонент с ошибкой
import UserForCreationDTO from "../../DTOs/ForCreation/UserForCreationDTO";
import Notification from '../Notification/Notification';

export default function MainReg() {
  const roles = useSelector((state) => state.role.roles);
  const isLoading = useSelector((state) => state.role.isLoading);
  const error = useSelector((state) => state.role.error);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Создаем навигацию

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    phone: "",
    role: {}, // Для хранения выбранной роли
  });
  const [formErrors, setFormErrors] = useState({
    nameErr: "",
    surnameErr: "",
    patronymicErr: "",
    emailErr: "",
    phoneErr: "",
    roleErr: "",
  });

  const [notificationObject, setNotificationObject] = useState({
    textValue: "",
    color: "#fff",
    openModal: false,
  });

  const changeFormData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSelect = (selectedItem) => {
    changeFormData("role", selectedItem); // Сохраняем выбранную роль
  };

  const handleInInput = (e) => {
    const { name, value } = e.target;
    changeFormData(name, value);
  };

  const handleClearInput = (name) => {
    changeFormData(name, "");
  };

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

  const handleOnRegistationButton = async () => {
    try {
      const dataForCreate = new UserForCreationDTO(formData);

      await dispatch(
        registrationUser(dataForCreate)
      ).unwrap();

      handleSetNotification("User has been created", "#00FF00");
      
      // Переход на страницу /user
      setTimeout(() => {
        navigate("/user");
      }, 2000); // Даем пользователю время увидеть уведомление
    } catch (err) {
      handleSetNotification(err.message, "#F00");
      if (err.details) {
        setFormErrors(err.details); // Отображаем ошибки валидации
      } else {
        console.error("Ошибка регистрации:", err.message);
      }
    }
  };

  return (
    <section className="section-form-data-for-reg-user">
      <Notification
        onClose={handleOnCloseNotification}
        text={notificationObject.textValue}
        open={notificationObject.openModal}
        bgColor={notificationObject.color}
      />
      <h1 className="title-data-for-reg-user">Create users:</h1>
      <div className="inputs-form-data-for-reg-user">
        <h3>Person data:</h3>
        <div className="content-input-form-data-for-reg-user">
          {/* Поля ввода для данных пользователя с ошибками */}
          <InputDataWithError
            errorMessage={formErrors.surnameErr}
            onClear={handleClearInput}
            iconName="Login-Icon.svg"
            placeholderValue="Surname"
            nameOfInput="surname"
            value={formData.surname}
            onInput={handleInInput}
          />
          <InputDataWithError
            errorMessage={formErrors.nameErr}
            onClear={handleClearInput}
            iconName="Login-Icon.svg"
            placeholderValue="Name"
            nameOfInput="name"
            value={formData.name}
            onInput={handleInInput}
          />
          <InputDataWithError
            errorMessage={formErrors.patronymicErr}
            onClear={handleClearInput}
            iconName="Login-Icon.svg"
            placeholderValue="Patronymic"
            nameOfInput="patronymic"
            value={formData.patronymic}
            onInput={handleInInput}
          />
          <InputDataWithError
            errorMessage={formErrors.emailErr}
            onClear={handleClearInput}
            iconName="Login-Icon.svg"
            placeholderValue="Email"
            nameOfInput="email"
            value={formData.email}
            onInput={handleInInput}
          />
          <InputDataWithError
            errorMessage={formErrors.phoneErr}
            onClear={handleClearInput}
            iconName="Login-Icon.svg"
            placeholderValue="Phone"
            nameOfInput="phone"
            value={formData.phone}
            onInput={handleInInput}
          />

          {isLoading && <p>Loading roles...</p>}
          {error && <p className="error-message">Failed to load roles: {error}</p>}
          {!isLoading && !error && (
            <CustomerSelectWithError
              options={roles}
              filterKey="name"
              placeholderValue="Choose role for user"
              onSelect={handleOnSelect}
              error={formErrors.roleErr} // Передаем ошибку для выбора роли
            />
          )}
        </div>

        <CustomerButton
          textValue="Registration"
          onClick={handleOnRegistationButton}
        />
      </div>
    </section>
  );
}
