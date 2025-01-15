import './PasswordUpdateModal.css';
import CustomerModal from '../CustomerModal/CustomerModal';
import InputPassword from '../InputPassword/InputPassword';
import { useState } from 'react';

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

  const [oldPasswordError, setOldPasswordError] = useState(""); // Error state for old password
  const [newPasswordError, setNewPasswordError] = useState(""); // Error state for new password
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Error state for confirm password

  // Обработчик для старого пароля
  const handleInputOldPasswordValueInput = (e) => {
    const value = e.target.value;
    setOldPasswordValueInput(value);    

    // Очистка ошибки при вводе
      setOldPasswordError(""); // No error
    
  };

  // Обработчик для нового пароля
  const handleInputNewPasswordValueInput = (e) => {
    const value = e.target.value;
    setNewPasswordValueInput(value);

    // Очистка ошибки при вводе
      setNewPasswordError(""); // No error
    
  };

  // Обработчик для подтверждения пароля
  const handleInputConfirmPasswordValueInput = (e) => {
    const value = e.target.value;
    setConfirmPasswordValueInput(value);

    // Очистка ошибки при вводе
      setConfirmPasswordError(""); // No error
    
  };

  const handleCloseModal = () => {
    // Сброс значений полей и ошибок при закрытии модального окна
    setOldPasswordValueInput("");
    setNewPasswordValueInput("");
    setConfirmPasswordValueInput("");
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    clickOnClose(); // вызов обработчика закрытия модального окна
  };
  
  const handleClickOnButtonChange = () => {
    const errors = {}; // Объект для хранения ошибок
  
    // Проверяем старый пароль
    if (!oldPasswordValueInput.trim()) {
      errors.oldPassword = "It's mandatory to enter";
    }
  
    // Проверяем новый пароль
    if (!newPasswordValueInput.trim()) {
      errors.newPassword = "It's mandatory to enter";
    }
  
    // Проверяем совпадение нового пароля с подтверждением
    if (newPasswordValueInput !== confirmPasswordValueInput) {
      errors.confirmPassword = "The repeated password does not match the new one";
    }
  
    // Если есть ошибки, устанавливаем их в стейт и выходим
    if (Object.keys(errors).length > 0) {
      setOldPasswordError(errors.oldPassword || "");
      setNewPasswordError(errors.newPassword || "");
      setConfirmPasswordError(errors.confirmPassword || "");
      return;
    }
  
    // Если ошибок нет, обрабатываем отправку данных на сервер
    // Пример:
    // sendPasswordChangeRequest(oldPasswordValueInput, newPasswordValueInput)
    console.log("Password change successful");
  };
  
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
        errorMessage={oldPasswordError} // Передаем ошибку для старого пароля
      />
      <InputPassword
        placeholderValue={textValueNewPasswordPlaceholder}
        textValue={newPasswordValueInput}
        onInput={handleInputNewPasswordValueInput} // Обработчик ввода нового пароля
        errorMessage={newPasswordError} // Передаем ошибку для нового пароля
      />
      <InputPassword
        placeholderValue={textValueConfirmPasswordPlaceholder}
        textValue={confirmPasswordValueInput}
        onInput={handleInputConfirmPasswordValueInput} // Обработчик ввода подтверждения пароля
        errorMessage={confirmPasswordError} // Передаем ошибку для подтверждения пароля
      />
    </CustomerModal>
  );
}
