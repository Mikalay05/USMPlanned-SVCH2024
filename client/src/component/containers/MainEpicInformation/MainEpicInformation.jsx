import EpicActionsData from '../EpicActionsData/EpicActionsData'
import InformationForEpic from '../InformationForEpic/InformationForEpic'
import './MainEpicInformation.css'
export default function MainEpicInformation() {
    return (
        <main>
            <InformationForEpic/>
            <EpicActionsData/>
        </main>
    )
}