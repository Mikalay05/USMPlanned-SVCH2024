class InformationProjectDto {
  constructor(dbData) {
    // Устанавливаем projectId, projectName и description
    this.projectId = dbData.project_id; // Изменено для соответствия данным из БД
    this.projectName = dbData.project_name; // Изменено
    this.description = dbData.project_description; // Изменено

    // Статус
    this.status = {
      status_id: dbData.status_id || null, // Если status_id отсутствует, будет null
      status_name: dbData.status_name || 'Unknown', // Если status_name отсутствует, будет 'Unknown'
    };

    // Массив действий (actions)
    this.actions = (dbData.actions || []).map(action => ({
      user: {
        userLogin: action.user.login,
        userFullName:  action.user.full_name,
      },
      actionId: action.action_id || null, // Изменено для соответствия данным из БД
      createdAt: action.created_at || null, // Изменено
      actionName: action.description || 'Unknown action', // Изменено для использования поля description
    }));

    // Массив данных для выбора (dataForSelect)
    this.dataForSelect = (dbData.dataForSelect || []).map(item => ({
      customerId: item.customer_id || null, // Измените на соответствующее поле из БД
      customerName: item.customer_name || 'Unknown', // Измените на соответствующее поле из БД
    }));
  }
}

module.exports = InformationProjectDto;