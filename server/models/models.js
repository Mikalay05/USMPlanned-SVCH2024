const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Общие атрибуты
const perentUser = "user_id";
const perentRole = "role_id";
const perentProjectStatus = "status_id";
const perentTaskStatus = "status_id";
const perentProject = "project_id";
const perentCustomer = "customer_id";
const perentEpic = "epic_id";
const perentStory = "story_id";
const perentTask = "task_id";
const perentUrgencyStatus = "urgency_status_id";

const nameNextId = 'next_id';


const Role = sequelize.define("Role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  [perentRole]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Role, key: "id" },
  },
  surname: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  patronymic: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING,allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
});

const Token = sequelize.define("Token", {
  value: { type: DataTypes.STRING },
  [perentUser]: {
    type: DataTypes.INTEGER,
    primaryKey: true,
        references: { model: User, key: "id" },
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
  [perentProjectStatus]: { type: DataTypes.INTEGER, allowNull: false, references: {model: ProjectStatus, key: "id" } },
});

const Customer = sequelize.define("Customer", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: { type: DataTypes.STRING, allowNull: false },
  [perentProject]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Project, key: "id" },
  },
  [nameNextId]: {
    type: DataTypes.INTEGER,
  },
})


const Epic = sequelize.define("Epic", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  [perentCustomer]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Customer, key: "id" },
  },
  [nameNextId]: {
    type: DataTypes.INTEGER,
  },
});



const Story = sequelize.define("Story", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  [perentEpic]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Epic, key: "id" },
  },
  [nameNextId]: {
    type: DataTypes.INTEGER,
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
  deadline: {type: DataTypes.DATE},
  [perentTaskStatus]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: TaskStatus, key: "id" },
  },
  [perentUrgencyStatus]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UrgencyStatus,
      key: 'id'
    },
  },
  [nameNextId]: {
    type: DataTypes.INTEGER,
  },
});


const Action = sequelize.define("Action", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
  [perentUser]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: User,
        key: 'id'
    }
  },
  [perentProject]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Project,
        key: 'id'
    }
  },
  [perentCustomer]: {
    type: DataTypes.INTEGER,
    references: {
        model: Customer,
        key: 'id'
    }
  },
  [perentEpic]: {
    type: DataTypes.INTEGER,
    references: {
        model: Epic,
        key: 'id'
    }
  },
  [perentStory]: {
    type: DataTypes.INTEGER,
    references: {
        model: Story,
        key: 'id'
    }
  },
  [perentTask]: {
    type: DataTypes.INTEGER,
    references: {
        model: Task,
        key: 'id'
    }
  }
});

/*
*========== FK ==========
*/

//========== Role ==========
Role.hasMany(User, { foreignKey: perentRole });

//========== User ==========
User.belongsTo(Role, { foreignKey: perentRole });
User.hasOne(Token, { foreignKey: perentUser });
User.hasMany(Action, { foreignKey: perentUser });

//========== Token ==========
Token.belongsTo(User, { foreignKey: perentUser });

//========== Action ==========
Action.belongsTo(User, { foreignKey: perentUser });
Action.belongsTo(Project, { foreignKey: perentProject, onDelete: "CASCADE" });
Action.belongsTo(Customer, { foreignKey: perentCustomer });
Action.belongsTo(Epic, { foreignKey: perentEpic });
Action.belongsTo(Story, { foreignKey: perentStory });
Action.belongsTo(Task, { foreignKey: perentTask });


//========== ProjectStatus ==========
ProjectStatus.hasMany(Project, { foreignKey: perentProjectStatus });

//========== Project ==========
Project.belongsTo(ProjectStatus, { foreignKey: perentProjectStatus });

Project.hasMany(Customer, { foreignKey: perentProject, onDelete: "CASCADE" });
Project.hasMany(Action, { foreignKey: perentProject, onDelete: "CASCADE" });
//========== Customer ==========
Customer.belongsTo(Project, { foreignKey: perentProject, onDelete: "CASCADE" });


Customer.hasMany(Epic, { foreignKey: perentCustomer });
Customer.hasMany(Action, { foreignKey: perentCustomer });


//========== Epic ==========
Epic.belongsTo(Customer, { foreignKey: perentCustomer });


Epic.hasMany(Story, { foreignKey: perentEpic });
Epic.hasMany(Action, { foreignKey: perentEpic });


//========== Story ==========
Story.belongsTo(Epic, { foreignKey: perentEpic });


Story.hasMany(Task, { foreignKey: perentStory });
Story.hasMany(Action, { foreignKey: perentStory });


//========== UrgencyStatus ==========

//========== TaskStatus ==========
TaskStatus.hasMany(Task, { foreignKey: perentTaskStatus });


//========== Task ==========
Task.belongsTo(TaskStatus, { foreignKey: perentTaskStatus });
Task.belongsTo(UrgencyStatus, { foreignKey: perentUrgencyStatus });
Task.belongsTo(Story, { foreignKey: perentStory });

Task.hasMany(Action, { foreignKey: perentTask });


module.exports = {
  User,
  Role,
  Token,
  ProjectStatus,
  TaskStatus,
  Task,
  Story,
  Epic,
  Project,
  Action,
  UrgencyStatus,
  Customer
};
