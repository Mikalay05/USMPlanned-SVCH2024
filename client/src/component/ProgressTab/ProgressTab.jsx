import "./ProgressTab.css";

export default function ProgressTab({
  iconName,
  nameOfType,
  procentProgress,
  isEmpty = false,
}) {
  const isInactive = procentProgress === 100; // Проверяем, 100% ли прогресс
  if (isEmpty) {
    return (
      <div
        className={`progress-tab-section ${isInactive ? "inactive" : ""}`}
      ></div>
    );
  }
  return (
    <div className={`progress-tab-section ${isInactive ? "inactive" : ""}`}>
      <div className="progress-tab-name">
        <img src={`/${iconName}`} alt={nameOfType} />
        <p>{nameOfType}</p>
      </div>
      <p>Progress: {procentProgress}%</p>
    </div>
  );
}
