import EpicActionsData from '../EpicActionsData/EpicActionsData'
import EpicDetails from '../EpicDetails/EpicDetails'
import InformationForEpic from '../InformationForEpic/InformationForEpic'
import SliderMapOfStoriesForTheCustomer from '../SliderMapOfStoriesForTheCustomer/SliderMapOfStoriesForTheCustomer'
import './MainEpicInformation.css'
export default function MainEpicInformation() {
    return (
        <main className="conteiner-MainEpicInformation">
            <InformationForEpic/>
            <SliderMapOfStoriesForTheCustomer/>
            <EpicDetails/>
            <EpicActionsData/>
        </main>
    )
}