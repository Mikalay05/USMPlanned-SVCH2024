import "./ProjectInformation.css"

import Header from '../../component/Header/Header'
import Footer from '../../component/Footer/Footer'
import CustomerSelect from "../../component/CustomerSelect/CustomerSelect"


export default function ProjectInformation() {
    const project = {
        id: 0,
        name: "ProjectName"
    }
    const epic = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
        { id: 4, name: 'User 4' }
    ];
    return (
        <>
        <Header/>
                <h1>{project.name}</h1>
                <CustomerSelect options={epic} filterKey="name" maxItems={5}/>
        <Footer/>
        </>
    
    )
}