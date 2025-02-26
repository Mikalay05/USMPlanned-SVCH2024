class InformationStoryDto {
  constructor(serverData) {
    this.id = serverData.id; 
    this.name = serverData.name;
    this.description = serverData.description;
  
  }
}

module.exports = InformationStoryDto;
