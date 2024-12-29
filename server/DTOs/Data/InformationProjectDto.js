class InformationProjectDto {
  constructor(
    { status, actions, projectId, description, projectName, dataForSelect }
  ) {
    // Устанавливаем projectId, projectName и description
    this.projectId = projectId;
    this.projectName = projectName;
    this.description = description;

    // Статус
    this.status = {
      status_id: status?.status_id || null,  // Если status_id отсутствует, будет null
      status_name: status?.status_name || 'Unknown',  // Если status_name отсутствует, будет 'Unknown'
    };

    // Массив действий (actions)
    this.actions = (actions || []).map(action => ({
      actionId: action?.actionId || null,  // Если actionId отсутствует, будет null
      createdAt: action?.createdAt || null,  // Если createdAt отсутствует, будет null
      actionName: action?.actionName || 'Unknown action',  // Если actionName отсутствует, будет 'Unknown action'
    }));

    // Массив данных для выбора (dataForSelect)
    this.dataForSelect = (dataForSelect || []).map(item => ({
      customerId: item?.customerId || null,  // Если customerId отсутствует, будет null
      customerName: item?.customerName || 'Unknown',  // Если customerName отсутствует, будет 'Unknown'
    }));
  }
}

module.exports = InformationProjectDto;
