import "./InputPassword.css";
import { useState } from "react";

export default function InputPassword({
  textValue = "",
  withShowPasswordIcon = true,
  passwordIcon = {
    passwordIconClose: "PasswordIcon-EyesClose.svg",
    passwordIconOpen: "PasswordIcon-EyesOpen.svg",
  },
  placeholderValue = '',
  onInput,
  errorMessage = '',
}) {
  const [showPassword, toggleShowPassword] = useState(false);

  const handleShowPassword = () => {
    toggleShowPassword(!showPassword);
  };

  return(
    <div>
<div className="input-style-section-for-password-input">
    {withShowPasswordIcon && (
        <img onClick={handleShowPassword} src={`/${(showPassword?passwordIcon.passwordIconOpen:passwordIcon.passwordIconClose)}`}/>
    )}
    <input placeholder={placeholderValue} type={showPassword?"text":"password"} value={textValue} onInput={onInput} />
  </div>
  <p className="error-content">{errorMessage}</p>
    </div>

  ) 
}
