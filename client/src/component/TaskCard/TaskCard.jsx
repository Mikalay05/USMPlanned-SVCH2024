import CustomerCard from "../CustomerCard/CustomerCard"
import TaskStatus from "../TaskStatus/TaskStatus"
import "./TaskCard"

export default function TaskCard({
    taskData,
    cardIsActiveElement,
    RGBAColorForTaskCards={ r: 153, g: 0, b: 255 }
}) {
    console.log(taskData)
    return (
        <CustomerCard textValue={`${taskData.name}`} isActiveElement={cardIsActiveElement} backgroundColor={RGBAColorForTaskCards}> 
            <h4>{taskData.name}</h4>
            <img src=""/>
            <p ></p>
            <TaskStatus taskStatusId={taskData.taskStatusId} taskStatusName={taskData.taskStatusName}/>

        </CustomerCard>
    )
}