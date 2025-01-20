class InformationCustomerDto {
  constructor(serverData) {
    this.projectId = serverData.projectId; 
    this.projectName = serverData.projectName;
    this.description = serverData.description;

    // Статус
    this.status = {
      status_id: serverData.status.status_id || null, // Если status_id отсутствует, будет null
      status_name: serverData.status.status_name || 'Unknown', // Если status_name отсутствует, будет 'Unknown'
    };

  }
}

module.exports = InformationCustomerDto;