class InformationStoryDto {
  constructor(dbData) {
    this.id = dbData.id; 
    this.name = dbData.name;
    this.description = dbData.description;
  
  }
}

module.exports = InformationStoryDto;
