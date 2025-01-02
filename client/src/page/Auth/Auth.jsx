import { useNavigate } from "react-router-dom"; // Для навигации
import { useState } from "react";
import CustomerButton from "../../component/CustomerButton/CustomerButton";
import InputInFormWithError from "../../component/InputInFormWithError/InputInFormWithError";
import "./Auth.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/userSlice";
import InputPassword from "../../component/InputPassword/InputPassword";

export default function AuthComponent() {
  const [loginForm, setFormInput] = useState({
    login: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Для редиректа
  const [detailsError, setDetailsError] = useState({
    loginErr: "",
    passwordErr: "",
  });

  const handleLoginInput = (e) => {
    const { value } = e.target;
    setFormInput({
      ...loginForm,
      login: value,
    });
  };

  const handlePasswordInput = (e) => {
    const { value } = e.target;
    setFormInput({
      ...loginForm,
      password: value,
    });
  };

  const handleOnClearLogin = () => {
    setFormInput({
      ...loginForm,
      login: "",
    });
  };

  const handleOnClickSignIn = async () => {
    try {
      await dispatch(loginUser(loginForm)).unwrap();
      // Если успешно, перенаправляем пользователя
      navigate("/project");
    } catch (err) {
      // Если ошибка, отображаем её
      setDetailsError({
        loginErr: err.details?.loginErr,
        passwordErr: err.details?.passwordErr,
      });
    }
  };

  return (
    <section className="auth-section">
      <div className="left-section-auth">
        <h1>Sign in</h1>
      </div>
      <div className="right-section-auth">
        <div className="right-section-content">
          <p>Hello!</p>
          <InputInFormWithError
            onClear={handleOnClearLogin}
            value={loginForm.login}
            onInputData={handleLoginInput}
            placeholderValue="Login"
            iconName="Login-Icon.svg"
            textErrorValue={detailsError.loginErr}
          />
          <InputPassword
            errorMessage={detailsError.passwordErr}
            placeholderValue="Password"
            textValue={loginForm.password}
            onInput={handlePasswordInput}
          />
          <CustomerButton onClick={handleOnClickSignIn} textValue="Sign In" />
        </div>
      </div>
    </section>
  );
}
