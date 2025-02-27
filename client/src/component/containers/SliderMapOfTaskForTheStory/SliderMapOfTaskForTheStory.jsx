import "./SliderMapOfTaskForTheStory.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import SliderControls from "../../presentational/SliderControls/SliderControls";
import LoadingDots from "../../presentational/LoadingDots/LoadingDots";
import TaskCreationalModal from "../../presentational/TaskCreationalModal/TaskCreationalModal";
import CardForTask from "../../presentational/CardForTask/CardForTask";

export default function SliderMapOfTaskForTheStory({
  storyLocalStorage = "currentTaskIndex",
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    projectId: projectIdString,
    customerId: customerIdString,
    epicId: epicIdString,
    storyId: storyIdString,
  } = useParams();
  const projectId = Number(projectIdString);
  const customerId = Number(customerIdString);
  const epicId = Number(epicIdString);
  const storyId = Number(storyIdString);

  const tasksForSelectInTheStory = useSelector(
    (state) => state.story.tasksForSelectInTheStory
  );

  const data = tasksForSelectInTheStory?.tasksData || [];
  const [isElementDragged, setIsElementDragged] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const taskIndex = localStorage.getItem(storyLocalStorage);
    const index = taskIndex !== null ? Number(taskIndex) : 0;
    return isNaN(index) ? 0 : index;
  });
  const handleSetCurrentIndex = (newIndex) => {
    setCurrentIndex(newIndex);
    localStorage.setItem(storyLocalStorage, newIndex);
  };
  const [draggedIndex, setDraggedIndex] = useState(-1);

  function getNewDraggedArr(data, draggedIndex, currentIndex) {
    const modifiedData = [...data];
    const draggedItem = modifiedData.splice(currentIndex, 1)[0];
    modifiedData.splice(draggedIndex, 0, draggedItem);
    return modifiedData;
  }

  const draggedData = getNewDraggedArr(data, draggedIndex, currentIndex);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(data.length - 1, prevIndex + 1));
  };
  const getNextIdOfArray = (currentIndex, arr) => {
    if (currentIndex + 1 >= arr.length) return null;
    return arr[currentIndex + 1].id;
  };

  const onClickOnElement = (index) => {
    handleSetCurrentIndex(index);
  };

  const handleOnClickToAgreeMove = () => {
    alert("Not implementation");
    // const nextId = getNextIdOfArray(draggedIndex, data);
    // const storyId = data[currentIndex].id;
    // const dataOfBody = { nextId, storyId };
    // const pathObject = { projectId, customerId, epicId };

    // dispatch(reorderStories({ paths: pathObject, data: dataOfBody }))
    //   .unwrap()
    //   .then(() => {
    //     handleSetCurrentIndex(draggedIndex);
    //     setIsElementDragged(false);
    //   })
    //   .catch((error) =>
    //     console.error("Ошибка при обновлении порядка историй:", error)
    //   );
  };

  const handleOnClickToDisagreeMove = () => {
    setIsElementDragged(false);
    setDraggedIndex(-1);
  };
  const [openCreationModal, setOpenCreationModal] = useState(false);
  const handleOnCloseInCreationalModal = () => {
    setOpenCreationModal(false);
    setCreationData({});
  };
  const onClickOnEmptyElement = () => {
    setOpenCreationModal(true);
  };

  const nameField = "name";
  const descriptionField = "description";
  const deadlineField = "deadline";
  const statusIdField = "statusId";
  const urgencyStatusField = "urgencyStatusId";
  const [creationData, setCreationData] = useState({
    [nameField]: "",
    [descriptionField]: "",
    [deadlineField]: "",
    [statusIdField]: "",
    [urgencyStatusField]: "",
  });
  const handleOnInputInCreationModal = (propertyName, value) => {
    setCreationData((prev) => ({ ...prev, [propertyName]: value }));
  };
  const displayedData = isElementDragged ? draggedData : data;
  const handleOnClearInCreationModal = (propertyName) => {
    handleOnInputInCreationModal(propertyName, "");
  };
  const handleCreateStory = () => {
    alert("Not implementation");

    // const pathObject = { projectId, customerId, epicId };
    // const dataOfObject = {
    //   name: creationData[storyNameField],
    //   description: creationData[storyDescriptionField],
    //   next_id: getNextIdOfArray(currentIndex, data),
    // };

    // dispatch(createStory({ paths: pathObject, dataForCreate: dataOfObject }))
    //   .unwrap()
    //   .then(() => {
    //     setOpenCreationModal(false);
    //     setCreationData({ [storyNameField]: "" });
    //   })
    //   .catch((error) => console.error("Ошибка при создании истории:", error));
  }; 
  const { taskStatuses, isLoading } = useSelector((state) => state.taskStatus);
  
  return (
    <>
      <SliderControls
        currentIndex={currentIndex}
        handleOpenModalForCreationCustomer={() => setOpenCreationModal(true)}
        handleDecomposition={() =>
          navigate(
            `/information/${projectId}/${customerId}/${epicId}/${data[currentIndex].id}`
          )
        }
        onSetIsElementDragged={() => {
          setDraggedIndex(currentIndex);
          setIsElementDragged(true);
        }}
        isElementDragged={isElementDragged}
        handlePrev={handlePrev}
        handleNext={handleNext}
        onClickOnElement={onClickOnElement}
        onClickOnEmptyElement={onClickOnEmptyElement}
        onClickToAgreeMove={handleOnClickToAgreeMove}
        onClickToDisagreeMove={handleOnClickToDisagreeMove}
        draggedIndex={draggedIndex}
      >
        {displayedData.map((item, index) => (
          <CardForTask key={index} dataOfObject={item} />
        ))}
      </SliderControls>
      <TaskCreationalModal
        isModalOpen={openCreationModal}
        nameField={nameField}
        descriptionField={descriptionField}
        deadlineField={deadlineField}
        statusIdField={statusIdField}
        urgencyStatusField={urgencyStatusField}
        dataOfValues={creationData}
        onCloseModal={handleOnCloseInCreationalModal}
        onInputChange={handleOnInputInCreationModal}
        onCreateStory={handleCreateStory}
        onClear={handleOnClearInCreationModal}
        isLoadingTaskStatus = {isLoading}
        arrTaskStatus={taskStatuses}
        filterKeyInSelectTaskStatus = "name"
      
        isLoadingUrgencyStatus = {false}
        arrUrgencyStatus = {[]}
        filterKeyInSelectUrgencyStatus = "name"
      />
    </>
  );
}
