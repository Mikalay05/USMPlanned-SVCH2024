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
}) {
  if (isEmpty) {
    return (
      <div className="projectCard-section">
        <div></div>
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
