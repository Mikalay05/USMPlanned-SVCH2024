import './TitleForProjectInformation.css'


import CustomerSelect from '../CustomerSelect/CustomerSelect'
import CustomerButton from '../CustomerButton/CustomerButton'
export default function TitleForProjectInformation({
    projectData,
    
    filterKey='customerName',
    nameOButtonToExportUSM = 'Export USM',
    iconPathToMove = 'Icon-MoveElement.svg',
    iconPathToAdd = 'Icon-AddElement.svg',
    iconPathToDecomposition = 'Icon-Decomposition.svg'
}) 
{
    return (
        <div className='container-TitleForProjectInformation'>
            <h1>{projectData.projectName}</h1>
            <h3>{projectData.status.status_name}</h3>
            <div className='selected-in-TitleForProjectInformation'>
            <CustomerSelect options={projectData.dataForSelect} filterKey={filterKey}/>
            </div>
            <CustomerButton textValue={nameOButtonToExportUSM}/>
            <div className='icons-box-TitleForProjectInformation'>
                <div className='icons-changed-box-TitleForProjectInformation'>
                <img src={`/${iconPathToMove}`} alt='move'/>
                <img src={`/${iconPathToAdd}`} alt='add'/>
                </div>
                <img src={`/${iconPathToDecomposition}`} alt='Decomposition'/>
            </div>
        </div>
    )
}