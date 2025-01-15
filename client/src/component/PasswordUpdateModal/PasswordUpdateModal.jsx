import './PasswordUpdateModal.css';
import CustomerModal from '../CustomerModal/CustomerModal';
import InputPassword from '../InputPassword/InputPassword';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { changePassword } from "../../store/slices/userSlice";
//FIXME отображение ошибок пароля
export default function PasswordUpdateModal({
  openModal,
  textTitle = "Change password",
  buttonTextContent = "Change",
  clickOnClose,
  currentUserId,
  textValueOldPasswordPlaceholder = "Old password...",
  textValueNewPasswordPlaceholder = "New password...",
  textValueConfirmPasswordPlaceholder = "Confirm password...",
}) {
  const [oldPasswordValueInput, setOldPasswordValueInput] = useState("");
  const [newPasswordValueInput, setNewPasswordValueInput] = useState("");
  const [confirmPasswordValueInput, setConfirmPasswordValueInput] = useState("");

  const [passwordErrors, setPasswordErrors] = useState({
    oldPasswordErr: "",
    newPasswordErr: "",
    confirmPasswordErr: "",
  }); // Один стейт для всех ошибок

  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate для перенаправления
  const clearPasswordError = () => {
    setPasswordErrors({
      oldPasswordErr: "",
      newPasswordErr: "",
      confirmPasswordErr: "",
    });
  }
  // Обработчик для старого пароля
  const handleInputOldPasswordValueInput = (e) => {
    const value = e.target.value;
    setOldPasswordValueInput(value);
    setPasswordErrors((prevErrors) => ({ ...prevErrors, oldPasswordErr: "" })); // Очистка ошибки старого пароля
  };

  // Обработчик для нового пароля
  const handleInputNewPasswordValueInput = (e) => {
    const value = e.target.value;
    setNewPasswordValueInput(value);
    setPasswordErrors((prevErrors) => ({ ...prevErrors, newPasswordErr: "" })); // Очистка ошибки нового пароля
  };

  // Обработчик для подтверждения пароля
  const handleInputConfirmPasswordValueInput = (e) => {
    const value = e.target.value;
    setConfirmPasswordValueInput(value);
    setPasswordErrors((prevErrors) => ({ ...prevErrors, confirmPasswordErr: "" })); // Очистка ошибки подтверждения пароля
  };

  const handleCloseModal = () => {
    // Сброс значений полей и ошибок при закрытии модального окна
    setOldPasswordValueInput("");
    setNewPasswordValueInput("");
    setConfirmPasswordValueInput("");
    clearPasswordError();
        clickOnClose(); // вызов обработчика закрытия модального окна
  };

  const handleClickOnButtonChange = async () => {
    const errors = {}; // Объект для хранения ошибок

    // Проверяем старый пароль
    if (!oldPasswordValueInput.trim()) {
      errors.oldPasswordErr = "It's mandatory to enter";
    }

    // Проверяем новый пароль
    if (!newPasswordValueInput.trim()) {
      errors.newPasswordErr = "It's mandatory to enter";
    }

    // Проверяем совпадение нового пароля с подтверждением
    if (newPasswordValueInput !== confirmPasswordValueInput) {
      errors.confirmPasswordErr = "The repeated password does not match the new one";
    }

    // Если есть ошибки, устанавливаем их в стейт и выходим
    if (Object.keys(errors).length > 0) {
      setPasswordErrors({
        oldPasswordErr: errors.oldPasswordErr,
        newPasswordErr: errors.newPasswordErr,
        confirmPasswordErr: errors.confirmPasswordErr,
      });
      return;
    }

    try {
      await dispatch(
        changePassword({
          userId: currentUserId,
          updatedPasswordData: { oldPassword: oldPasswordValueInput, newPassword: newPasswordValueInput },
        })
      ).unwrap();

      // Отображаем уведомление об успехе
      alert("Password updated successfully");

      // Переход через 3 секунды
      setTimeout(() => {
        navigate("/project"); // Перенаправляем на /project
      }, 3000);
    } catch (err) {
      // Обработка ошибок
      if (err && err.details) {
        // Если ошибки приходят с сервера
        const { details } = err;
        console.log("details.passwordErr", details.passwordErr);
        setPasswordErrors({
          oldPasswordErr: details.passwordErr,
          newPasswordErr: details.newPasswordErr,
          confirmPasswordErr: details.confirmPasswordErr,
        });
        alert("TEST")
      } else {
        console.error(err.message);
      }
    }
  };
console.log("passwordErrors",passwordErrors)
  return (
    <CustomerModal
      openModal={openModal}
      textTitle={textTitle}
      buttonTextContent={buttonTextContent}
      clickOnClose={handleCloseModal} // вызываем новый обработчик при закрытии
      clickOnButton={handleClickOnButtonChange}
    >
      <InputPassword
        placeholderValue={textValueOldPasswordPlaceholder}
        textValue={oldPasswordValueInput}
        onInput={handleInputOldPasswordValueInput} // Обработчик ввода старого пароля
        errorMessage={passwordErrors.oldPasswordErr} // Передаем ошибку для старого пароля
      />
      <InputPassword
        placeholderValue={textValueNewPasswordPlaceholder}
        textValue={newPasswordValueInput}
        onInput={handleInputNewPasswordValueInput} // Обработчик ввода нового пароля
        errorMessage={passwordErrors.newPasswordErr} // Передаем ошибку для нового пароля
      />
      <InputPassword
        placeholderValue={textValueConfirmPasswordPlaceholder}
        textValue={confirmPasswordValueInput}
        onInput={handleInputConfirmPasswordValueInput} // Обработчик ввода подтверждения пароля
        errorMessage={passwordErrors.confirmPasswordErr} // Передаем ошибку для подтверждения пароля
      />
    </CustomerModal>
  );
}
