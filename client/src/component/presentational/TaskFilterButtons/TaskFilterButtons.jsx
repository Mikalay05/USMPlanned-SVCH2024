import FilterButton from "../FilterButton/FilterButton";
import "./TaskFilterButtons.css";

export default function TaskFilterButtons({
  arrUrgencyStatuses = [],
  nameOfFieldInUrgencyStatuses = "name",
  activeIndexUrgencyStatuses = -1,
  arrTaskStatuses = [],
  nameOfFieldInTaskStatuses = "name",
  activeIndexTaskStatuses = -1,
  onClickElement = () => {}
}) {
  return (
    <div>
      <div className="container-buttons-UrgencyStatuses">
        {arrUrgencyStatuses.map((element, index) => (
          <FilterButton
            key={index}
            textValue={element[nameOfFieldInUrgencyStatuses]}
            isActive={index === activeIndexUrgencyStatuses}
            onClick={() => onClickElement("urgency", index)}
          />
        ))}
      </div>
      <div className="container-buttons-TaskStatuses">
        {arrTaskStatuses.map((element, index) => (
          <FilterButton
            key={index}
            textValue={element[nameOfFieldInTaskStatuses]}
            isActive={index === activeIndexTaskStatuses}
            onClick={() => onClickElement("task", index)}
          />
        ))}
      </div>
    </div>
  );
}
