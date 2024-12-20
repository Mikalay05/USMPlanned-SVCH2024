import CardProject from "../CardProject/CardProject";
import InputData from "../InputData/InputData";
import "./ProjectComponent.css";

export default function ProjectComponent({
    arrProject = [],
    iconAdd = "IconAdd.svg",
    iconDelete = "IconDelete.svg",
    iconChange = "IconChange.svg"
}) {
    console.log(arrProject)
    return (
        <section className="project-section">
           <InputData placeholderValue="Search..." iconName="IconSearch.svg" />

            <div className="icon-container">
                <img src={`/${iconAdd}`} alt="Add Project" />
                <img src={`/${iconDelete}`} alt="Delete Project" />
                <img src={`/${iconChange}`} alt="Change Project" />
            </div>

            <div className="project-section-content">
                {arrProject.map((project, index) => (
                    <CardProject 
                        key={index} 
                        projectName={project.name} 
                        statusName = {project.status}
                    />
                ))}
            </div>
        </section>
    );
}