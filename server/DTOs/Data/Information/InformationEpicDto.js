class InformationEpicDto {
  constructor(dbData) {
    this.id = dbData.epic_id; 
    this.name = dbData.epic_name ;
  }
}

module.exports = InformationEpicDto;