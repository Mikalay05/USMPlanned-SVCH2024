class InformationProjectDto {
  constructor(dbData) {
    // Устанавливаем projectId, projectName и description
    this.projectId = dbData.projectId || null; // Установлено значение null по умолчанию, если projectId отсутствует
    this.projectName = dbData.projectName || 'Untitled Project'; // Название проекта или дефолтное значение
    this.description = dbData.description || 'No description provided'; // Описание проекта или дефолтное значение

    // Статус проекта
    this.status = {
      status_id: dbData.status?.status_id || null, // Если статус отсутствует, устанавливаем null
      status_name: dbData.status?.status_name || 'Unknown Status', // Если имя статуса отсутствует, устанавливаем дефолтное значение
    };

    // Массив действий (actions)
    this.actions = Array.isArray(dbData.actions)
      ? dbData.actions.map(action => ({
          user: {
            userLogin: action.user?.login || 'Unknown Login', // Логин пользователя или дефолтное значение
            userFullName: action.user?.full_name || 'Unknown User', // Полное имя пользователя или дефолтное значение
          },
          actionId: action.action_id || null, // Id действия или null
          createdAt: action.created_at || null, // Дата создания или null
          actionName: action.description || 'No action description', // Имя действия или дефолтное значение
        }))
      : [];

    // Данные для выбора (dataForSelect)
    this.dataForSelect = Array.isArray(dbData.dataForSelect)
      ? dbData.dataForSelect.map(item => ({
          customerId: item.customerId || null, // Id заказчика или null
          customerName: item.customerName || 'Unknown Customer', // Имя заказчика или дефолтное значение
        }))
      : [];
  }
}

module.exports = InformationProjectDto;
