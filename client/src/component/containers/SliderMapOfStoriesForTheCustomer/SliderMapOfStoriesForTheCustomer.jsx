import "./SliderMapOfStoriesFotTheCustomer.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createStory, reorderStories } from "../../../store/slices/epicSlice";
import SliderControls from "../../presentational/SliderControls/SliderControls";
import CardForStory from "../../presentational/CardForStory/CardForStory";
import LoadingDots from "../../presentational/LoadingDots/LoadingDots";
import StoryCreationalModal from "../StoryCreationalModal/StoryCreationalModal";

export default function SliderMapOfStoriesForTheCustomer({
  epicLocalStorage = "currentStoryIndex",
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId: projectIdString, customerId: customerIdString, epicId: epicIdString } =
    useParams();
  const projectId = Number(projectIdString);
  const customerId = Number(customerIdString);
  const epicId = Number(epicIdString);

  const storiesForSelectInTheEpic = useSelector(
    (state) => state.epic.storiesForSelectInTheEpic
  );
  const data = storiesForSelectInTheEpic?.storiesData || [];
  const [isElementDragged, setIsElementDragged] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const storedIndex = localStorage.getItem(epicLocalStorage);
    const index = storedIndex !== null ? Number(storedIndex) : 0;
    return isNaN(index) ? 0 : index;
  });

  const handleSetCurrentIndex = (newIndex) => {
    setCurrentIndex(newIndex);
    localStorage.setItem(epicLocalStorage, newIndex);
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

  const onClickOnEmptyElement = () => {
    setOpenCreationModal(true);
  };

  const handleOnClickToDisagreeMove = () => {
    setIsElementDragged(false);
    setDraggedIndex(-1);
  };

  const handleOnClickToAgreeMove = () => {
    const nextId = getNextIdOfArray(draggedIndex, data);
    const storyId = data[currentIndex].id;
    const dataOfBody = { nextId, storyId };
    const pathObject = { projectId, customerId, epicId };

    dispatch(reorderStories({ paths: pathObject, data: dataOfBody }))
      .unwrap()
      .then(() => {
        handleSetCurrentIndex(draggedIndex);
        setIsElementDragged(false);
      })
      .catch((error) => console.error("Ошибка при обновлении порядка историй:", error));
  };

  const [openCreationModal, setOpenCreationModal] = useState(false);
  const storyNameField = "nameOfStory";
  const [creationData, setCreationData] = useState({ [storyNameField]: "" });

  const handleOnCloseInCreationalModal = () => {
    setOpenCreationModal(false);
    setCreationData({ [storyNameField]: "" });
  };

  const handleOnInputInCreationModal = (propertyName, value) => {
    setCreationData((prev) => ({ ...prev, [propertyName]: value }));
  };

  const handleCreateStory = () => {
    const pathObject = { projectId, customerId, epicId };
    const dataOfObject = {
      name: creationData[storyNameField],
      next_id: getNextIdOfArray(currentIndex, data),
    };

    dispatch(createStory({ paths: pathObject, dataForCreate: dataOfObject }))
      .unwrap()
      .then(() => {
        setOpenCreationModal(false);
        setCreationData({ [storyNameField]: "" });
      })
      .catch((error) => console.error("Ошибка при создании истории:", error));
  };

  if (storiesForSelectInTheEpic.isLoading) {
    return (
      <div>
        Loading...
        <LoadingDots />
      </div>
    );
  }
  const handleOnClearInCreationModal = (propertyName) => {
    handleOnInputInCreationModal(propertyName, "");
  };
  const displayedData = isElementDragged ? draggedData : data;

  return (
    <>
      <SliderControls
        currentIndex={currentIndex}
        handleOpenModalForCreationCustomer={() => setOpenCreationModal(true)}
        handleDecomposition={() => navigate(`/information/${projectId}/${customerId}/${epicId}/${data[currentIndex].id}`)}
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
          <CardForStory key={index} dataOfObject={item} />
        ))}
      </SliderControls>
      <StoryCreationalModal
        isModalOpen={openCreationModal}
        customerNameField={storyNameField}
        dataOfValues={creationData}
        onCloseModal={handleOnCloseInCreationalModal}
        onInputChange={handleOnInputInCreationModal}
        onCreateCustomer={handleCreateStory}
        onClear={handleOnClearInCreationModal}

      />
    </>
  );
}
