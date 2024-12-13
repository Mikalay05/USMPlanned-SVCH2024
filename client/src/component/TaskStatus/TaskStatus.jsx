import "./TaskStatus.css"

import ColoredCircle from "../ColoredCircle/ColoredCircle"

const arrColorsOfStatus = [
 {r: 255, g:0, b:0},
{r: 242, g:255, b:0},
{r: 38, g:255, b:0}
]

const typesDataComponent = [
    "data",
    "choose"
]
export default function TaskStatus({
    type = typesDataComponent[0],
    taskStatusId,
    taskStatusName
}) {
    return (

        <div className="task-status-content">
        <ColoredCircle RGBColorCircle={arrColorsOfStatus[taskStatusId]}/>
        <p>{taskStatusName}</p>
        </div>
    )
}