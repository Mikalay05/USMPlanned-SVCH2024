import "./MainReg.css";
import { useSelector } from "react-redux";
import { useState } from "react";

import CustomerButton from "../CustomerButton/CustomerButton";
import CustomerSelect from "../CustomerSelect/CustomerSelect";
import InputData from "../InputData/InputData";

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

  // Локальное состояние для хранения выбранного элемента
  const [selectedRole, setSelectedRole] = useState(null);
  const changeFormData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value, // Обновляем соответствующее поле в стейте
    }); 
  }
  // Обработчик выбора элемента
  const handleOnSelect = (selectedItem) => {
    changeFormData("status",selectedItem)
  };
  const handleInInput = (e) => {
    const {name, value} = e.target;
    changeFormData(name,value);
  }
  const handleClearInput = (name) => {
    changeFormData(name,"");
  }
  const handlOnRegistationButton=()=> {
    
  }
  console.log(formData)
  return (
    <main>
      <h1>Create users:</h1>
      <div>
        <h3>Person data:</h3>
        <div>
        <InputData onClear={handleClearInput} iconName="Login-Icon.svg" placeholderValue="Surname" nameOfInput="surname" value={formData.surname} onInput={handleInInput}/>
        <InputData onClear={handleClearInput} iconName="Login-Icon.svg" placeholderValue="Name" nameOfInput="name" value={formData.name} onInput={handleInInput}/>
        <InputData onClear={handleClearInput} iconName="Login-Icon.svg" placeholderValue="Patronymic" nameOfInput="patronymic" value={formData.patronymic} onInput={handleInInput}/>
        <InputData onClear={handleClearInput} iconName="Login-Icon.svg" placeholderValue="Email" nameOfInput="email" value={formData.email} onInput={handleInInput}/>
        <InputData onClear={handleClearInput} iconName="Login-Icon.svg" placeholderValue="Phone" nameOfInput="phone" value={formData.phone} onInput={handleInInput}/>

          {/* Отображение статуса загрузки, ошибки или основного контента */}
          {isLoading && <p>Loading roles...</p>}
          {error && <p className="error-message">Failed to load roles: {error}</p>}
          {!isLoading && !error && (
            <CustomerSelect 
              filterKey={"name"} 
              options={roles} 
              onSelect={handleOnSelect} // Передаём обработчик выбора
            />
          )}
        </div>
        {/* Отображаем выбранный элемент */}
        {selectedRole && (
          <p className="selected-info">
            Selected Role: {selectedRole.name}
          </p>
        )}
        <CustomerButton
          textValue="Registration"
          disabled={isLoading || !!error || !selectedRole} // Блокируем, если нет выбранного элемента
        />
      </div>
    </main>
  );
}
