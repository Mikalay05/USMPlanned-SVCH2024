import "./SliderMapOfEpicsForTheClient.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Импорт useNavigate
import { useState } from "react";
import {createEpic} from '../../../store/slices/customerSlice'
import SliderControls from "../../presentational/SliderControls/SliderControls";
import CardForEpic from "../../presentational/CardForEpic/CardForEpic";
import LoadingDots from "../../presentational/LoadingDots/LoadingDots";
import EpicCreationalModal from "../EpicCreationalModal/EpicCreationalModal";
//Текущий currentIndex = 
export default function SliderMapOfEpicsForTheClient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId: projectIdString, customerId: customerIdString } = useParams();

  // Преобразуем строки в числа
  const projectId = Number(projectIdString);
  const customerId = Number(customerIdString);
  /*
  =============== SLIDER ===============
  */
  const epicsForSelectFotTheCustomer = useSelector(
    (state) => state.customer.epicsForSelectInTheCustomer
  );
  const data = epicsForSelectFotTheCustomer?.epicsData || [];
  const [currentIndex, setCurrentIndex] = useState(() => {
    const storedIndex = localStorage.getItem("currentIndex");
    return storedIndex !== null ? Number(storedIndex) : 0;
  });

  const [draggedIndex, setDraggedIndex] = useState(-1);

  // Функция получения индексов prev и next
  function getNewDraggedArr(data, draggedIndex, currentIndex) {
    const modifiedData = [...data];
    const draggedItem = modifiedData.splice(currentIndex, 1)[0]; // Убираем элемент
    modifiedData.splice(draggedIndex, 0, draggedItem); // Вставляем элемент на новое место
    return modifiedData;
  }

  const draggedData = getNewDraggedArr(data, draggedIndex, currentIndex);

  // Логирование действий с слайдером
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(0, prevIndex - 1);
      return newIndex;
    });
  };
  const getNextIdOfArray = (currentIndex, arr) => {
    if(currentIndex+1>=arr.length) {
      return null;
    }
    return data[currentIndex+1].id; 
  }
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.min(data.length - 1, prevIndex + 1);
      return newIndex;
    });
  };

  const onClickOnElement = (index) => {
    setCurrentIndex(index);
  };
  const onClickOnEmptyElement = () => {
    setOpenCreationModal(true);
  };
  const handleOnClickToDisagreeMove = () => {
    setIsElementDragged(false);
    setDraggedIndex(-1);
  };

  const handleOnClickToAgreeMove = () => {
    //получить next_id
    const nextIndex =
    draggedIndex + 1 >= draggedData.length ? null : draggedIndex + 1;

    //отправить запрос

  };

  const handleNextToDragged = () => {
    if (draggedIndex !== data.length - 1) {
      setDraggedIndex(draggedIndex + 1);
    }
  };

  const handlePrevToDragged = () => {
    if (draggedIndex !== 0) {
      setDraggedIndex(draggedIndex - 1);
    }
  };

  /*
  =============== CREATION MODAL ===============
  */
  const [openCreationModal, setOpenCreationModal] = useState(false);
  const customerNameField = "nameOfEpic";
  const [сreationData, setСreationData] = useState({
    [customerNameField]: "",
  });
  const setEmptyCreationData = () => {
    setСreationData({
      [customerNameField]: "",
    });
  };

  const handleOnCloseInCreationalModal = () => {
    setOpenCreationModal(false);
    setEmptyCreationData();
  };
  const handleOnInputInCreationModal = (propertyName, value) => {
    setСreationData((prev) => ({
      ...prev,
      [propertyName]: value,
    }));
  };
  const handleOnClearInCreationModal = (propertyName) => {
    handleOnInputInCreationModal(propertyName, "");
  };

  /*
  =============== ACTION ICONS ===============
  */
  const handleDecomposition = () => {
    navigate(
      `/information/${projectId}/${customerId}/${data[currentIndex].id}`
    );
  };

  const [isElementDragged, setIsElementDragged] = useState(false);
  const handleOnSetIsElementDragged = () => {
    setDraggedIndex(currentIndex);
    setIsElementDragged(true);
  };

  const handleOpenModalForCreationCustomer = () => {
    setOpenCreationModal(true);
  };

  const handleCreateCustomer = () => {
    const pathObject = {
      projectId,
      customerId,
    };

    const dataOfObject = {
      name: сreationData.nameOfEpic,
      next_id: getNextIdOfArray(currentIndex, data),
    };
    console.log(dataOfObject)
    dispatch(createEpic({ paths: pathObject, dataForCreate: dataOfObject }))
    .unwrap() 
    .then(() => {
      //TODO установка currentIndex

      // Закрываем модальное окно и очищаем данные
      setOpenCreationModal(false);
      setEmptyCreationData();
    })
    .catch((error) => {
      console.error("Ошибка при создании эпика:", error);
    });  }
  // Проверка на загрузку или отсутствие данных
  if (epicsForSelectFotTheCustomer.isLoading) {
    return (
      <div>
        Loading...
        <LoadingDots />
      </div>
    );
  }
  return (
    <>
      <SliderControls
        currentIndex={currentIndex}
        handleOpenModalForCreationCustomer={handleOpenModalForCreationCustomer}
        handleDecomposition={handleDecomposition}
        onSetIsElementDragged={handleOnSetIsElementDragged}
        isElementDragged={isElementDragged}
        handlePrev={handlePrev}
        handleNext={handleNext}
        onClickOnElement={onClickOnElement}
        onClickOnEmptyElement={onClickOnEmptyElement}
        onClickCurrentElement={handleDecomposition}
        emptyCardComponent={CardForEpic}
        onClickToAgreeMove={handleOnClickToAgreeMove}
        onClickToDisagreeMove={handleOnClickToDisagreeMove}
        handlePrevToDragged={handlePrevToDragged}
        handleNextToDragged={handleNextToDragged}
        draggedIndex={draggedIndex}
      >
        {isElementDragged
          ? draggedData.map((item) => (
              <CardForEpic key={item.id} dataOfObject={item} />
            ))
          : data.map((item) => (
              <CardForEpic key={item.id} dataOfObject={item} />
            ))}
      </SliderControls>
      <EpicCreationalModal
        isModalOpen={openCreationModal}
        customerNameField={customerNameField}
        dataOfValues={сreationData}
        onCloseModal={handleOnCloseInCreationalModal}
        onInputChange={handleOnInputInCreationModal}
        onClear={handleOnClearInCreationModal}
        onCreateCustomer={handleCreateCustomer}
      />
    </>
  );
}
