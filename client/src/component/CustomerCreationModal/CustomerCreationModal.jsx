import "./CustomerCreationModal.css";
import { useState } from "react";

import CustomerModal from "../presentational/CustomerModal/CustomerModal";
import InputData from "../InputData/InputData";
export default function CustomerCreationModal({
  titleName = "Create customer",
  handleCloseModal, // Контролирует родитель
  placeholderValueInInputCustomerName = "Customer name...",
  customerNameField = "customerName",
  isLoadingCustomer,
  showNotification,
  onCreateCustomer,
  isModalOpen,
}) {
  const [nameOfCustomer, setNameOfCustomer] = useState('');

  const handleFormData = (fieldName, value) => {
    if (!fieldName) {
      console.error("Field name from input not found.");
      return;
    }
    setNameOfCustomer(value); // Обновляем только значение имени клиента
  };

  const handleInputData = (e) => {
    const { name, value } = e.target;
    handleFormData(name, value);
  };

  const handleClear = () => {
    setNameOfCustomer(''); // Очищаем поле ввода
  };

  const handleOnClickButton = () => {
    if (onCreateCustomer) {
      onCreateCustomer(nameOfCustomer);
      handleClear(); // Очищаем поле после создания клиента
    }
  };

  const handleCloseModalWithClear = () => {
    handleClear(); // Очищаем поле перед закрытием модального окна
    handleCloseModal();
  };

  return (
    <>
      {isModalOpen && (
        <CustomerModal
          textTitle={titleName}
          clickOnClose={handleCloseModalWithClear} // Закрытие с очисткой
          clickOnButton={handleOnClickButton}
        >
          <InputData
            type="text"
            value={nameOfCustomer}
            placeholderValue={placeholderValueInInputCustomerName}
            nameOfInput={customerNameField}
            closeIconPath="CloseIconInInput.svg"
            onInput={handleInputData}
            onClear={handleClear}
          />
        </CustomerModal>
      )}
    </>
  );
}
