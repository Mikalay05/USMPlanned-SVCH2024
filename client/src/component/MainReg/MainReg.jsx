import "./MainReg.css";
import { useSelector } from "react-redux";
import { useState } from "react";

import { useDispatch } from "react-redux"; // Для вызова action
import { registrationUser } from "../../store/slices/userSlice"; // Импорт экшена

import CustomerButton from "../CustomerButton/CustomerButton";
import CustomerSelect from "../CustomerSelect/CustomerSelect";
import InputDataWithError from "../InputDataWithError/InputDataWithError"; // Импортируем компонент с ошибкой

export default function MainReg() {
  const roles = useSelector((state) => state.role.roles);
  const isLoading = useSelector((state) => state.role.isLoading);
  const error = useSelector((state) => state.role.error);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    phone: "",
    status: {},
  });

  const [formErrors, setFormErrors] = useState({
    nameErr: "",
    surnameErr: "",
    patronymicErr: "",
    emailErr: "",
    phoneErr: "",
  });

  const changeFormData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSelect = (selectedItem) => {
    changeFormData("status", selectedItem);
  };

  const handleInInput = (e) => {
    const { name, value } = e.target;
    changeFormData(name, value);
  };

  const handleClearInput = (name) => {
    changeFormData(name, "");
  };

  const handleOnRegistationButton = async () => {
    try {
      const { name, surname, patronymic, email, phone, status } = formData;

      await dispatch(
        registrationUser({
          name,
          surname,
          patronymic,
          email,
          phone,
          role: status,
        })
      ).unwrap();

      setFormErrors({});
    } catch (err) {
      console.log("ПОЙМАЛЛЛЛЛЛ", err)
      if (err.details) {
        console.log("УСТАНОВИЛ")

        setFormErrors(err.details); // Отображаем ошибки валидации
      } else {
        console.error("Ошибка регистрации:", err.message);
      }
    }
  };

  return (
    <section className="section-form-data-for-reg-user">
      <h1 className="title-data-for-reg-user">Create users:</h1>
      <div className="inputs-form-data-for-reg-user">
        <h3>Person data:</h3>
        <div className="content-input-form-data-for-reg-user">
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
            <CustomerSelect
              filterKey={"name"}
              options={roles}
              placeholderValue="Choose role for user"
              onSelect={handleOnSelect}
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
