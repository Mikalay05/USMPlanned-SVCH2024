import CardProject from "../CardProject/CardProject";
import InputData from "../InputData/InputData";
import "./ProjectComponent.css";

// TODO в будущем можно будет получать из БД
const arrProject = [
    {
        projectName: "ProjectName",
        mustProgress: 100,
        shouldProgress: 21, 
        couldProgress: 20
    },
    {
        projectName: "ProjectName",
        mustProgress: 30,
        shouldProgress: 100, 
        couldProgress: 15
    },
    {
        projectName: "ProjectName",
        mustProgress: 15,
        shouldProgress: 10, 
        couldProgress: 5
    }
];

export default function ProjectComponent({
    iconAdd = "IconAdd.svg",
    iconDelete = "IconDelete.svg",
    iconChange = "IconChange.svg"
}) {
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
                        projectName={project.projectName} 
                        mustProgress={project.mustProgress} 
                        shouldProgress={project.shouldProgress}
                        couldProgress={project.couldProgress}
                    />
                ))}
            </div>
        </section>
    );
}