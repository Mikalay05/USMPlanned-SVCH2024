import { useState } from "react";
import InputData from "../InputData/InputData";
import "./InputInFormWithError.css";

export default function InputInFormWithError({
    placeholderValue,
    iconName,
    textErrorValue,
    isPassword,
    passwordIcon = {
        passwordIconClose: "PasswordIcon-EyesClose.svg",
        passwordIconOpen: "PasswordIcon-EyesOpen.svg" // Исправлено имя иконки для открытого глаза
    }
}) {
    const [showPassword, toggleShowPassword] = useState(false);

    const handleShowPassword = () => {
        toggleShowPassword(!showPassword);
    };

    const currentIconName = isPassword ? (showPassword ? passwordIcon.passwordIconOpen : passwordIcon.passwordIconClose) : iconName;

    return (
        <section>
            <InputData 
                placeholderValue={placeholderValue} 
                iconName={currentIconName} 
                onClickIcon={isPassword ? handleShowPassword : null} 
                type={isPassword ? (showPassword ? "text" : "password") : "text"}
            />
            <p className="error-content">{textErrorValue}</p>
        </section>
    );
}