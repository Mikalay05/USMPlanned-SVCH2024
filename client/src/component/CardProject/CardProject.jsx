import ProgressTab from "../ProgressTab/ProgressTab";
import CustomerButton from "../CustomerButton/CustomerButton";
import "./CardProject.css";
export default function CardProject({
  projectName,
  statusName,
  mustProgress = "no data",
  shouldProgress = "no data",
  couldProgress = "no data",
  isEmpty = false,
  onClickOnEmptyElement
}) {
  const handleOnClickElement = () => {
    if(onClickOnEmptyElement) {
      onClickOnEmptyElement();
      return;
    }
    console.log("НЕТУ НАЖАТИЯ НА ОБРАБОТЧИК")

  }
  if (isEmpty) {
    return (
      <div className="projectCard-section"
      onClick={handleOnClickElement}>
        <div className="empty-line-project-card"/>
        <div className="empty-line-project-card"/>
        <ProgressTab isEmpty={true} />
        <ProgressTab isEmpty={true} />
        <ProgressTab isEmpty={true} />
        <CustomerButton textValue="Next" isEmpty={true} />
      </div>
    );
  }

  return (
    <div className="projectCard-section">
      <p>{statusName}</p>
      <h4>{projectName}</h4>
      <ProgressTab
        iconName="Icon-Must.svg"
        nameOfType="Must"
        procentProgress={mustProgress}
      />
      <ProgressTab
        iconName="Icon-Should.svg"
        nameOfType="Should"
        procentProgress={shouldProgress}
      />
      <ProgressTab
        iconName="Icon-Could.svg"
        nameOfType="Could"
        procentProgress={couldProgress}
      />
      <CustomerButton textValue="Next" />
    </div>
  );
}
