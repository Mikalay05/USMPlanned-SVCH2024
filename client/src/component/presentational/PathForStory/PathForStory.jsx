import CardForEpic from '../CardForEpic/CardForEpic'
import CardForStory from '../CardForStory/CardForStory'
import CardProject from '../CardProject/CardProject'
import CustomerCard from '../CustomerCard/CustomerCard'
import './PathForStory.css'

export default function PathForStory({
    customerData = {},
    epicData = {},
    storyData = {},
}) {
    return (
        <div className='container-PathForStory'>
            <CustomerCard textValue={customerData.name} isActiveElement={true}/>
            <CardForEpic dataOfObject={epicData} isActive={true}/>
            <CardForStory dataOfObject={storyData} isActive={true} nameOfUser={customerData.name}/>
        </div>
    )
}