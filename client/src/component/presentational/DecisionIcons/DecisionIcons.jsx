import "./DecisionIcons.css";
export default function DecisionIcons({
  disagreeIconName = "Icon-Disagree.png",
  disagreeAltIconName = "disagree",
  onDisagreeClick = () => {},
  agreeIconName = "Icon-Agree.png",
  agreeAltIconName = "agree",
  onAgreeClick = () => {},
}) {
  return (
    <div className="icons-decision">
      <img
        className="icon-disagree"
        src={`/${disagreeIconName}`}
        alt={disagreeAltIconName}
        onClick={onDisagreeClick}
      />
      <img
        className="icon-agree"
        src={`/${agreeIconName}`}
        alt={agreeAltIconName}
        onClick={onAgreeClick}
      />
    </div>
  );
}
