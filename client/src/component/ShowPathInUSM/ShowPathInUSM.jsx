import "./ShowPathInUSM.css";

import CustomerCard from "../CustomerCard/CustomerCard";
import TaskCard from "../TaskCard/TaskCard";

export default function ShowPathInUSM({
    customerData,
    epicData = null,
    storyData = null,
    taskData = null,
    cardIsActiveElement=true,
    RGBAColorForCustomerCards = { r: 75, g: 245, b: 231 },
    RGBAColorForEpicCards = { r: 245, g: 242, b: 75 },
    RGBAColorForStoryCards = { r: 0, g: 255, b: 38 },
    RGBAColorForTaskCards = { r: 153, g: 0, b: 255 },    

}) {
    return (
        <section>
            <CustomerCard textValue={`${customerData.name}`} isActiveElement={cardIsActiveElement} backgroundColor={RGBAColorForCustomerCards} />
            {epicData && <CustomerCard textValue={`${epicData.name}`} isActiveElement={cardIsActiveElement} backgroundColor={RGBAColorForEpicCards}/>}
            {storyData && <CustomerCard textValue={`${storyData.name}`} isActiveElement={cardIsActiveElement} backgroundColor={RGBAColorForStoryCards}/>}
            {taskData && <TaskCard taskData={taskData} cardIsActiveElement={true}/>}
        </section>
    );
}