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
  }
}

module.exports = InformationProjectDto;
