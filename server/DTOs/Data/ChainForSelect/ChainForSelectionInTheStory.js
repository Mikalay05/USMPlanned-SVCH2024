class ChainForSelectionInTheStory {
  constructor({ id, name, status, deadline, description, urgency_status }) {
    this.id = id;
    this.name = name;
    this.status = { name: status.name, statusId: status.status_id };
    this.deadline = deadline;
    this.description = description;
    this.urgencyStatus = {
      img: urgency_status.img,
      name: urgency_status.name,
      urgencyStatusId: urgency_status.urgency_status_id,
    };
  }
}

module.exports = ChainForSelectionInTheStory;
