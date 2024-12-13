import "./ProjectInformation.css"

import Header from '../../component/Header/Header'
import Footer from '../../component/Footer/Footer'


export default function ProjectInformation() {
    const project = {
        id: 0,
        name: "ProjectName"
    }
    return (
        <>
        <Header/>
                <h1>{project.name}</h1>
        <Footer/>
        </>
    
    )
}