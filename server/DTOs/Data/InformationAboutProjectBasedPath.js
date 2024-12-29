class InformationAboutProjectBasedPath {
    constructor(
      projectId,
      projectName,
      description,
      status,  // статус теперь передается как объект
      dataForSelect,
      actions
    ) {
      this.projectId = projectId;
      this.projectName = projectName;
      this.description = description;
      this.status = status || {};  // если статус не передан, по умолчанию пустой объект
      this.dataForSelect = dataForSelect || [];
      this.actions = actions || [];
    }
  }
  
  module.exports = InformationAboutProjectBasedPath;
  