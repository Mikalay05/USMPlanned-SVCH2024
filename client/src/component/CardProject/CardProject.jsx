import ProgressTab from "../ProgressTab/ProgressTab"
import CustomerButton from '../CustomerButton/CustomerButton'
import "./CardProject.css"
export default function CardProject({
    projectName,
    statusName,
    mustProgress = "no data",
    shouldProgress = "no data",
    couldProgress = "no data"
}) {
    return (
        <div className="projectCard-section">
            <h4>{projectName}</h4>
            <p>{statusName}</p>
            <ProgressTab     iconName="Icon-Must.svg" nameOfType="Must" procentProgress={mustProgress}/>
            <ProgressTab     iconName="Icon-Should.svg" nameOfType="Should" procentProgress={shouldProgress}/>
            <ProgressTab     iconName="Icon-Could.svg" nameOfType="Could" procentProgress={couldProgress}/>
            <CustomerButton textValue="Next"/>
        </div>
    )
}