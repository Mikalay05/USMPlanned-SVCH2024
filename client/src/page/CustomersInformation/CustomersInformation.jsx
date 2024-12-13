import "./CustomersInformation.css"

import Header from '../../component/Header/Header'
import Footer from '../../component/Footer/Footer'
import CustomerSelect from "../../component/CustomerSelect/CustomerSelect"


export default function CustomersInformation() {
    const project = {
        id: 0,
        name: "ProjectName"
    }
    const Customer = [
        { id: 1, name: 'Common user' },
        { id: 2, name: 'Developer' },
        { id: 3, name: 'Team laed' },
        { id: 4, name: 'Admin' }
    ];
    const ProjectId = "";
    const UserId = "";
    const CustomerId = "";
    const EpicId = "";
    const StoryId = "";
    const TaskId = "";
    
    return (
        <>
        <Header/>
                <h1>{project.name}</h1>
                <CustomerSelect options={Customer} filterKey="name" maxItems={5} placeholderValue="Choose User"/>
        <Footer/>
        </>
    
    )
}