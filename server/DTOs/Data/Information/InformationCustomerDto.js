class InformationCustomerDto {
  constructor(dbData) {
    this.id = dbData.customer_id || null; // Установлено значение null по умолчанию, если projectId отсутствует
    this.name = dbData.customer_name || 'Untitled customer'; // Название проекта или дефолтное значение
  }
}

module.exports = InformationCustomerDto;
