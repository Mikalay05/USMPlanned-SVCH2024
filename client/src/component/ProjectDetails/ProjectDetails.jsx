import "./ProjectDetails.css";

import CustomerButton from "../CustomerButton/CustomerButton";

export default function ProjectDetails({ projectData }) {
  return (
    <div>
      <h3>Description of Project:</h3>
      <p>{projectData.description}</p>
      <div>
        <CustomerButton textValue="Change project" />
        <CustomerButton textValue="Delete project" />
      </div>
      <div>
        <h3>Actions of Project:</h3>
        <div>
          {projectData.actions.length > 0 ? (
            projectData.actions.map((action) => (
              <p key={action.actionId}>
                {action.createdAt} | {action.actionName}
              </p>
            ))
          ) : (
            <p>Action not found</p>
          )}
        </div>
      </div>
    </div>
  );
}
