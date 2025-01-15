import './PasswordUpdateModal.css'
import CustomerModal from '../CustomerModal/CustomerModal'
import InputPassword from '../InputPassword/InputPassword'
import { useState } from 'react'
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
    const handleInputOldPasswordValueInput = (e) => {
        const textValueOfInput = e.target.value;
        console.log(textValueOfInput);
        setOldPasswordValueInput(textValueOfInput)
    }
    const [newPasswordValueInput, setNewPasswordValueInput] = useState("");
    const [confirmPasswordValueInput, setConfirmPasswordValueInput] = useState("");
    return (
        <CustomerModal openModal={openModal}
        textTitle={textTitle}
        buttonTextContent={buttonTextContent}
        clickOnClose={clickOnClose}
        clickOnButton={()=> {}}>
      <InputPassword
        placeholderValue={textValueOldPasswordPlaceholder}
        value={oldPasswordValueInput}
        onInput={handleInputOldPasswordValueInput} // Обработчик ввода старого пароля
      />
      <InputPassword
        placeholderValue={textValueNewPasswordPlaceholder}
        value={newPasswordValueInput}
        onInput={(e) => setNewPasswordValueInput(e.target.value)} // Обработчик ввода нового пароля
      />
      <InputPassword
        placeholderValue={textValueConfirmPasswordPlaceholder}
        value={confirmPasswordValueInput}
        onInput={(e) => setConfirmPasswordValueInput(e.target.value)} // Обработчик ввода подтверждения пароля
      />
        </CustomerModal>
    )
}