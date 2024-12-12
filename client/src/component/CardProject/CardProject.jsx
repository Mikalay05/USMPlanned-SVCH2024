import ProgressTab from "../ProgressTab/ProgressTab"
import CustomerButton from '../CustomerButton/CustomerButton'
import "./CardProject.css"
export default function CardProject({
    projectName,
    mustProgress,
    shouldProgress, 
    couldProgress
}) {
    return (
        <div className="projectCard-section">
            <h4>{projectName}</h4>
            <ProgressTab     iconName="Icon-Must.svg" nameOfType="Must" procentProgress={mustProgress}/>
            <ProgressTab     iconName="Icon-Should.svg" nameOfType="Should" procentProgress={shouldProgress}/>
            <ProgressTab     iconName="Icon-Could.svg" nameOfType="Could" procentProgress={couldProgress}/>
            <CustomerButton textValue="Next"/>
        </div>
    )
}