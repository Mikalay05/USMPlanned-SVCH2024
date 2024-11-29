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
Person.hasOne(User, { foreignKey: "person_id" });
User.belongsTo(Person, { foreignKey: "person_id" });

Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

User.hasOne(Token, { foreignKey: "user_login" });
Token.belongsTo(User, { foreignKey: "user_login" });

User.hasMany(Action, { foreignKey: "user_login" });
Action.belongsTo(User, { foreignKey: "user_login" });

ProjectStatus.hasMany(Project, { foreignKey: "status_id" });
Project.belongsTo(ProjectStatus, { foreignKey: "status_id" });

Project.hasMany(EpicOrder, { foreignKey: "project_id" });
EpicOrder.belongsTo(Project, { foreignKey: "project_id" });

Project.hasMany(StoryOrder, { foreignKey: "project_id" });
Project.hasMany(Epic, { foreignKey: "project_id" });
Project.hasMany(Action, { foreignKey: "project_id" });

Epic.belongsTo(Project, { foreignKey: "project_id" });
Epic.hasOne(EpicOrder, { foreignKey: "epic_id" });
Epic.hasMany(StoryOrder, { foreignKey: "epic_id" });
Epic.hasMany(Story, { foreignKey: "epic_id" });
Epic.hasMany(Action, { foreignKey: "epic_id" });

Story.belongsTo(Epic, { foreignKey: "epic_id" });
Story.hasOne(StoryOrder, { foreignKey: "story_id" });
Story.hasMany(TaskOrder, { foreignKey: "story_id" });
Story.hasMany(Task, { foreignKey: "story_id" });
Story.hasMany(Action, { foreignKey: "story_id" });

StoryOrder.belongsTo(Story, { foreignKey: "story_id" });
StoryOrder.belongsTo(Epic, { foreignKey: "epic_id" });

TaskStatus.hasMany(Task, { foreignKey: "status_id" });
Task.belongsTo(TaskStatus, { foreignKey: "status_id" });

Task.belongsTo(UrgencyStatus, { foreignKey: "urgency_status_id" });
Task.belongsTo(Story, { foreignKey: "story_id" });
Task.hasOne(TaskOrder, { foreignKey: "task_id" });
Task.hasMany(Action, { foreignKey: "task_id" });

TaskOrder.belongsTo(Task, { foreignKey: "task_id" });
TaskOrder.belongsTo(Story, { foreignKey: "story_id" });

Action.belongsTo(Project, { foreignKey: "project_id" });
Action.belongsTo(Epic, { foreignKey: "epic_id" });
Action.belongsTo(Story, { foreignKey: "story_id" });
Action.belongsTo(Task, { foreignKey: "task_id" });


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
