import "./EpicDetails.css";
import CustomerButton from "../../CustomerButton/CustomerButton";
import ConfirmationModal from "../../presentational/ConfirmationModal/ConfirmationModal";
import React, { useEffect } from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEpic, updateDataOfEpic } from "../../../store/slices/epicSlice";
import { useNavigate, useParams } from "react-router-dom";
import EpicUpdateModal from "../../presentational/EpicUpdateModal/EpicUpdateModal";
import LoadingDots from "../../presentational/LoadingDots/LoadingDots";

export default function EpicDetails() {
  const {
    projectId: projectIdString,
    customerId: customerIdString,
    epicId: epicIdString,
  } = useParams();

  const projectId = Number(projectIdString);
  const customerId = Number(customerIdString);
  const epicId = Number(epicIdString);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получаем данные эпика из Redux
  const { epicData, isLoading } = useSelector(
    (state) => state.epic.currentEpic
  );

  const epicNameField = "nameOfEpic";
  const defaultObject = {
    [epicNameField]: epicData.name,
  };
  const [dataOfValues, setDataOfValues] = useState(defaultObject);
  // Синхронизация состояния с загруженными данными
  useEffect(() => {
    if (epicData) {
      setDataOfValues({
        [epicNameField]: epicData.name,
      });
    }
  }, [epicData]);

  // Если эпик загружается
  if (isLoading) {
    return (
      <div>
        Loading...
        <LoadingDots />
      </div>
    );
  }

  // Открытие и закрытие модальных окон
  const handleOnOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleOnCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleOnOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleOnCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setDataOfValues(defaultObject);
  };

  // Подтверждение удаления эпика
  const handleOnConfirm = async () => {
    setOpenDeleteModal(false);
    const paths = {
      projectId,
      customerId,
      epicId,
    };
    try {
      
      await dispatch(deleteEpic({paths})).unwrap();
      alert("Epic deleted");
      navigate(`/information/${projectId}/${customerId}/`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const handleOnSetDataOfValues = (name, value) => {
    setDataOfValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOnInputChange = (name, value) => {
    handleOnSetDataOfValues(name, value);
  };
  const handleOnClear = (name) => {
    handleOnSetDataOfValues(name, "");
  };
  const handleOnUpdate = async () => {
    const objectForBody = {
      name: dataOfValues[epicNameField],
    };
    const paths = {
      projectId,
      customerId,
      epicId,
    };

    try {
      await dispatch(updateDataOfEpic({ paths, objectForBody })).unwrap();
      alert("Updated epic");
      setOpenUpdateModal(false); // Закрываем модалку после успешного обновления
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  return (
    <div className="epic-actions-buttons">
      <CustomerButton
        textValue="Change epic"
        onClick={handleOnOpenUpdateModal}
      />
      <CustomerButton
        textValue="Delete epic"
        onClick={handleOnOpenDeleteModal}
      />
      {/* Модальное окно подтверждения удаления */}
      <ConfirmationModal
        isOpen={openDeleteModal}
        title="Do you want to delete the epic?"
        message="All related stories will be removed!"
        confirmButtonText="Yes, delete it."
        cancelButtonText="No, go back"
        onConfirm={handleOnConfirm}
        onCancel={handleOnCloseDeleteModal}
      />

      {/* Модальное окно изменения эпика */}
      <EpicUpdateModal
        epicNameField={epicNameField}
        dataOfValues={dataOfValues}
        openModal={openUpdateModal}
        clickOnClose={handleOnCloseUpdateModal}
        onClear={handleOnClear}
        onInputChange={handleOnInputChange}
        onUpdate={handleOnUpdate}
      />
    </div>
  );
}
