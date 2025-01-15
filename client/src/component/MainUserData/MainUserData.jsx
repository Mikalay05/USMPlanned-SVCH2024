import './MainUserData.css';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { updateUser } from "../../store/slices/userSlice";
import InputDataWithError from "../InputDataWithError/InputDataWithError";
import CustomerButton from "../CustomerButton/CustomerButton";
import Notification from "../Notification/Notification";
import PasswordUpdateModal from '../PasswordUpdateModal/PasswordUpdateModal';

export default function MainUserData() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Хук для навигации
  const { currentUser, isLoading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    login: currentUser?.login || "",
    phone: currentUser?.phone || "",
  });

  const [formErrors, setFormErrors] = useState({
    loginErr: "",
    phoneErr: "",
  });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };
  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };
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
      await dispatch(
        updateUser({
          userId: currentUser.id,
          updatedUserData: formData,
        })
      ).unwrap();

      // Очищаем ошибки
      setFormErrors({
        loginErr: "",
        phoneErr: "",
      });

      // Отображаем уведомление об успехе
      handleSetNotification("User data updated successfully", "#00FF00");

      // Переход через 3 секунды
      setTimeout(() => {
        navigate("/project"); // Перенаправляем на /project
      }, 3000);
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
      <PasswordUpdateModal openModal={isPasswordModalOpen} clickOnClose={handleClosePasswordModal}/>
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

        <div className='buttons-user-data'>
          <CustomerButton
            textValue="Change password"
            onClick={handleOpenPasswordModal}
            styleColor='gray'
          />
          <CustomerButton
            textValue="Save"
            onClick={handleOnUpdateButton}
          />
        </div>
      </div>
    </section>
  );
}
