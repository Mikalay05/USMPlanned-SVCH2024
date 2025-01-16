import "./MainChangeDataForUser.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../store/slices/userSlice"; // Экшен для обновления данных пользователя
import CustomerButton from "../CustomerButton/CustomerButton";
import CustomerSelectWithError from "../CustomerSelectWithError/CustomerSelectWithError";
import InputDataWithError from "../InputDataWithError/InputDataWithError";
import Notification from "../Notification/Notification";

export default function MainChangeDataForUser() {
  const roles = useSelector((state) => state.role.roles);
  const isLoadingRoles = useSelector((state) => state.role.isLoading);
  const errorRoles = useSelector((state) => state.role.error);
  const { targetUser, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    phone: "",
    role: {},
  });
  console.log(formData)
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

  useEffect(() => {
    // Загрузка данных текущего пользователя
    if (targetUser) {
      setFormData({
        name: targetUser.name || "",
        surname: targetUser.surname || "",
        patronymic: targetUser.patronymic || "",
        email: targetUser.email || "",
        phone: targetUser.phone || "",
        role: targetUser.role || {},
      });
    }
  }, [targetUser]);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error loading user data: {error}</div>;
  }

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

  const handleOnSaveChanges = async () => {
    try {
      // Здесь можно добавить валидацию данных перед отправкой

      await dispatch(updateUser(formData)).unwrap();

      handleSetNotification("User data has been updated", "#00FF00");

      // Переход на страницу пользователя после успешного обновления
      setTimeout(() => {
        navigate("/user");
      }, 2000);
    } catch (err) {
      handleSetNotification(err.message, "#F00");
      if (err.details) {
        setFormErrors(err.details); // Отображаем ошибки валидации
      } else {
        console.error("Ошибка при изменении данных:", err.message);
      }
    }
  };
  console.log(formData)
  return (
    <main className="main-change-data-for-user">
      <Notification
        onClose={handleOnCloseNotification}
        text={notificationObject.textValue}
        open={notificationObject.openModal}
        bgColor={notificationObject.color}
      />
      <h2>Change user:</h2>
      <div className="content-change-data-for-user">
        <h3>Person data:</h3>
        <div className="form-container">
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

          {isLoadingRoles && <p>Loading roles...</p>}
          {errorRoles && <p className="error-message">Failed to load roles: {errorRoles}</p>}
          {!isLoadingRoles && !errorRoles && (
            <CustomerSelectWithError
              options={roles}
              filterKey="name"
              placeholderValue="Choose role for user"
              onSelect={handleOnSelect}
              error={formErrors.roleErr}
              defaultValue={formData.role} // Предзаполняем текущую роль
            />
          )}
        </div>
        <CustomerButton textValue="Save Changes" onClick={handleOnSaveChanges} />
      </div>
    </main>
  );
}
