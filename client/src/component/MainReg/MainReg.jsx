import "./MainReg.css";
import { useSelector } from "react-redux";
import { useState } from "react";

import CustomerButton from "../CustomerButton/CustomerButton";
import CustomerSelect from "../CustomerSelect/CustomerSelect";
import InputDataWithError from "../InputDataWithError/InputDataWithError"; // Импортируем компонент с ошибкой

export default function MainReg() {
  const roles = useSelector((state) => state.role.roles);
  const isLoading = useSelector((state) => state.role.isLoading);
  const error = useSelector((state) => state.role.error);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    phone: "",
    status: {},
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    phone: "",
  });

  const changeFormData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value, // Обновляем соответствующее поле в стейте
    });
  };

  // Обработчик выбора элемента
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

  const handleOnRegistationButton = () => {
    
  };


  return (
    <section  className="section-form-data-for-reg-user">
      <h1 className="title-data-for-reg-user">Create users:</h1>
      <div className="inputs-form-data-for-reg-user">
        <h3>Person data:</h3>
        <div className="content-input-form-data-for-reg-user">
          <InputDataWithError
            errorMessage={formErrors.surname}
            onClear={handleClearInput}
            iconName="Login-Icon.svg"
            placeholderValue="Surname"
            nameOfInput="surname"
            value={formData.surname}
            onInput={handleInInput}
          />

          <InputDataWithError
            errorMessage={formErrors.name}
            onClear={handleClearInput}
            iconName="Login-Icon.svg"
            placeholderValue="Name"
            nameOfInput="name"
            value={formData.name}
            onInput={handleInInput}
          />

          <InputDataWithError
            errorMessage={formErrors.patronymic}
            onClear={handleClearInput}
            iconName="Login-Icon.svg"
            placeholderValue="Patronymic"
            nameOfInput="patronymic"
            value={formData.patronymic}
            onInput={handleInInput}
          />

          <InputDataWithError
            errorMessage={formErrors.email}
            onClear={handleClearInput}
            iconName="Login-Icon.svg"
            placeholderValue="Email"
            nameOfInput="email"
            value={formData.email}
            onInput={handleInInput}
          />

          <InputDataWithError
            errorMessage={formErrors.phone}
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
