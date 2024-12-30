import { useState } from "react";
import InputData from "../InputData/InputData";
import "./InputInFormWithError.css";

export default function InputInFormWithError({
    value,
    onInputData,
    placeholderValue,
    iconName,
    textErrorValue,
    isPassword,
    onClear,
    passwordIcon = {
        passwordIconClose: "PasswordIcon-EyesClose.svg",
        passwordIconOpen: "PasswordIcon-EyesOpen.svg"
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
                onClear={onClear}
                onInput={onInputData}
                value={value}
                placeholderValue={placeholderValue} 
                iconName={currentIconName} 
                onClickIcon={isPassword ? handleShowPassword : null} 
                typeOfData={isPassword ? (showPassword ? "text" : "password") : "text"}
            />
            <p className="error-content">{textErrorValue}</p>
        </section>
    );
}