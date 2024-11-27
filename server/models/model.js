const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  user_login: { type: DataTypes.STRING, primaryKey: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
});
const Role = sequelize.define("Role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});
const Person = sequelize.define("Person", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  surname: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  patronymic: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING },
});
const Token = sequelize.define("Token", {
  value: { type: DataTypes.STRING },
});
const Project = sequelize.define("Project", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: {type: DataTypes.STRING},
});
const ProjectStatus = sequelize.define("ProjectStatus", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
});
const Epic = sequelize.define("Epic", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    project_id: { type: DataTypes.INTEGER, primaryKey: true, references: {model:Project, key: "id"}},
});
const EpicOrder = sequelize.define("EpicOrder", {
    project_id: {type: DataTypes.INTEGER, primaryKey: true, references: {model: Epic, key: "project_id"}},
    epic_id: {type: DataTypes.INTEGER, primaryKey: true, references: {model: Epic, key: "id"}},
    display_order: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const Story = sequelize.define("Story", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    epic_id: { type: DataTypes.INTEGER, primaryKey: true, references: {model:Epic, key: "id"}},
    project_id: { type: DataTypes.INTEGER, references: {model:Epic, key: "project_id"}},
});
const Task = sequelize.define("Task", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    story_id: { type: DataTypes.INTEGER, primaryKey: true, references: {model:Story, key: "id"}},
    epic_id: { type: DataTypes.INTEGER, references: {model:Epic, key: "epic_id"}},

});


const StoryOrder = sequelize.define("StoryOrder", {
    epic_id: {type: DataTypes.INTEGER, primaryKey: true, references: {model: Story, key: "epic_id"}},
    story_id: {type: DataTypes.INTEGER, primaryKey: true, references: {model: Story, key: "id"}},
    display_order: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true} 
});
const TaskOrder = sequelize.define("TaskOrder", {
    story_id: {type: DataTypes.INTEGER, primaryKey: true, references: {model: Task, key: "story_id"}},
    task_id: {type: DataTypes.INTEGER, primaryKey: true, references: {model: Task, key: "id"}},
    display_order: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});
const TaskStatus = sequelize.define("TaskStatus", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
});


const UrgencyStatus = sequelize.define("UrgencyStatus", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    img: {type: DataTypes.STRING}
});

const Action = sequelize.define("Action", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING, allowNull: false },

});
Epic.hasOne(EpicOrder)
EpicOrder.belongsTo(Epic)
TaskStatus.hasMany(Task);
Task.belongsTo(TaskStatus)
Action.belongsTo(User);
User.hasMany(Action);
Action.belongsTo(Project);
Project.hasMany(Action);
Action.belongsTo(Epic);
Epic.hasMany(Action);
Action.belongsTo(Story);
Story.hasMany(Action);
Action.belongsTo(Task);
Task.hasMany(Action);

UrgencyStatus.hasMany(Task);
Task.belongsTo(UrgencyStatus)


Role.hasMany(User);
User.belongsTo(Role);

Person.hasOne(User);
User.belыongsTo(Person);

User.hasOne(Token);
Token.belongsTo(User);

Project.hasMany(Epic);
Epic.belongsTo(Project);

ProjectStatus.hasMany(Project);
Project.belongsTo(ProjectStatus);

Task.hasOne(TaskOrder)
TaskOrder.belongsTo(Task)

Story.hasOne(StoryOrder)
StoryOrder.belongsTo(Story)

module.exports = {
  User,
  Role,
  Person,
  Token,
  ProjectStatus,
  EpicOrder,
  StoryOrder,
  TaskOrder,
  TaskStatus,
  Task,
  Story,
  Epic,
  Project,
  Action,
  UrgencyStatus
};
