class InformationProjectData {
    constructor(
        projectId,
        projectName,
        description,
        statusId,
        statusName,
        dataForSelect,
        actions
    ) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.description = description;
        this.status = {
            status_id: statusId,
            status_name: statusName
        };
        this.dataForSelect = dataForSelect || [];
        this.actions = actions || [];
    }
}
