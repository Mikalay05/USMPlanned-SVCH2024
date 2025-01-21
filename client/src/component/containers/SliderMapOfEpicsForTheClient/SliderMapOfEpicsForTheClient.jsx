import "./SliderMapOfEpicsForTheClient.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Импорт useNavigate
import { useState } from "react";

import SliderControls from "../../presentational/SliderControls/SliderControls";
import CardForEpic from "../../presentational/CardForEpic/CardForEpic";
import LoadingDots from "../../presentational/LoadingDots/LoadingDots";
import EpicCreationalModal from "../EpicCreationalModal/EpicCreationalModal";

export default function SliderMapOfEpicsForTheClient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId, customerId } = useParams();
  /*
  ===============
  SLIDER
  ===============
  */
  const epicsForSelectFotTheCustomer = useSelector(
    (state) => state.customer.epicsForSelectInTheCustomer
  );
  const data = epicsForSelectFotTheCustomer?.epicsData;
  const [currentIndex, setCurrentIndex] = useState(() => {
    const storedIndex = localStorage.getItem("currentIndex");
    return storedIndex !== null ? Number(storedIndex) : 0;
  });
  const [draggedIndex, setDraggedIndex] = useState(-1); 
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(data.length - 1, prevIndex + 1));
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
  }
  const handleOnClickToAgreeMove = () => {
    alert("MOVE")
  }
  /*
  ===============
  CREATION MODAL
  ===============
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
  ===============
  ACTION ICONS
  ===============
  */
  const handleDecomposition = () => {
    navigate(
      `/information/${projectId}/${customerId}/${data[currentIndex].id}`
    );
  };
  const [isElementDragged , setIsElementDragged ] = useState(false);
  const handleOnSetIsElementDragged = () => {
    setDraggedIndex(currentIndex)
    setIsElementDragged(true);
  }
  const handleOpenModalForCreationCustomer = () => {
    setOpenCreationModal(true);
  };



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
        draggedIndex={draggedIndex}
      >
        {data.map((item) => (
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
      />
    </>
  );
}
