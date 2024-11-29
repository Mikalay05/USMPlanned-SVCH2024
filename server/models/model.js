const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Person = sequelize.define("Person", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  surname: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  patronymic: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING },
});

const Role = sequelize.define("Role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const User = sequelize.define("User", {
  login: { type: DataTypes.STRING, primaryKey: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Role, key: "id" },
  },
  person_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Person, key: "id" },
  },
});

const Token = sequelize.define("Token", {
  value: { type: DataTypes.STRING },
  user_login: {
    type: DataTypes.STRING,
    primaryKey: true,
        references: { model: User, key: "login" },
  },
});

const ProjectStatus = sequelize.define("ProjectStatus", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Project = sequelize.define("Project", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  status_id: { type: DataTypes.INTEGER, allowNull: false, references: {model: ProjectStatus, key: "id" } },
});

const Epic = sequelize.define("Epic", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Project, key: "id" },
  },
});

const EpicOrder = sequelize.define("EpicOrder", {
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Project, key: "id" },
  },
  epic_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Epic, key: "id" },
  },
  display_order: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

const Story = sequelize.define("Story", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  epic_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Epic, key: "id" },
  },
});

const StoryOrder = sequelize.define("StoryOrder", {
  epic_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Epic, key: "id" },
  },
  story_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Story, key: "id" },
  },
  display_order: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

const TaskStatus = sequelize.define("TaskStatus", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const UrgencyStatus = sequelize.define("UrgencyStatus", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING },
});

const Task = sequelize.define("Task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: TaskStatus, key: "id" },
  },
  urgency_status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UrgencyStatus,
      key: 'id'
    },
  },
});

const TaskOrder = sequelize.define("TaskOrder", {
  story_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Story, key: "id" },
  },
  task_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Task, key: "id" },
  },
  display_order: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

const Action = sequelize.define("Action", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
  user_login: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
        model: User,
        key: 'login'
    }
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Project,
        key: 'id'
    }
  },
  epic_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Epic,
        key: 'id'
    }
  },
  story_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Story,
        key: 'id'
    }
  },
  task_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Task,
        key: 'id'
    }
  }
});

Person.hasOne(User);
Role.hasMany(User);
User.belongsTo(Role);
User.belongsTo(Person);
User.hasOne(Token);
User.hasMany(Action);
Token.belongsTo(User);
ProjectStatus.hasMany(Project, {});
Project.belongsTo(ProjectStatus);
Project.hasMany(EpicOrder);
Project.hasMany(StoryOrder);
Project.hasMany(Epic);
Project.hasMany(Action);
Epic.belongsTo(Project);
Epic.hasOne(EpicOrder);
Epic.hasMany(StoryOrder);
Epic.hasMany(Story);
Epic.hasMany(Action);
EpicOrder.belongsTo(Epic);
EpicOrder.belongsTo(Project);
Story.belongsTo(Epic);
Story.hasOne(StoryOrder);
Story.hasMany(TaskOrder);
Story.hasMany(Task);
Story.hasMany(Action);
StoryOrder.belongsTo(Story);
StoryOrder.belongsTo(Epic);
TaskStatus.hasMany(Task);
Task.belongsTo(TaskStatus);
Task.belongsTo(UrgencyStatus);
Task.belongsTo(Story);
Task.hasOne(TaskOrder);
Task.hasMany(Action);
TaskOrder.belongsTo(Task);
TaskOrder.belongsTo(Story);
Action.belongsTo(User);
Action.belongsTo(Project);
Action.belongsTo(Epic);
Action.belongsTo(Story);
Action.belongsTo(Task);

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
  UrgencyStatus,
};
