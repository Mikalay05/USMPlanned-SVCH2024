class InformationProjectDto {
  constructor(serverData) {
    this.projectId = serverData.projectId; 
    this.projectName = serverData.projectName;
    this.description = serverData.description;

    // Статус
    this.status = {
      status_id: serverData.status.status_id || null, // Если status_id отсутствует, будет null
      status_name: serverData.status.status_name || 'Unknown', // Если status_name отсутствует, будет 'Unknown'
    };

    // Массив действий (actions)
    this.actions = (serverData.actions || []).map(action => ({
      user: {
        login: action.user.userLogin,
        fullName:  action.user.userFullName,
      },
      actionId: action.actionId || null, // Изменено для соответствия данным из БД
      createdAt: action.createdAt || null, // Изменено
      actionName: action.actionName || 'Unknown action', // Изменено для использования поля description
    }));

    // Массив данных для выбора (dataForSelect)
    this.dataForSelect = (serverData.dataForSelect || []).map(item => ({
      customerId: item.customerId || null, // Измените на соответствующее поле из БД
      customerName: item.customerName || 'Unknown', // Измените на соответствующее поле из БД
    }));
  }
}

module.exports = InformationProjectDto;