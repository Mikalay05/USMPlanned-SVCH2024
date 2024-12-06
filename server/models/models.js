const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Общие атрибуты
const perentPerson = "person_id";
const perentUser = "user_login";
const perentRole = "role_id";
const perentProjectStatus = "status_id";
const perentTaskStatus = "status_id";
const perentProject = "project_id";
const perentCustomer = "customer_id";
const perentEpic = "epic_id";
const perentStory = "story_id";
const perentTask = "task_id";
const perentUrgencyStatus = "urgency_status_id";

const Person = sequelize.define("Person", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  surname: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  patronymic: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING,allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
});

const Role = sequelize.define("Role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const User = sequelize.define("User", {
  login: { type: DataTypes.STRING, primaryKey: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  [perentRole]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Role, key: "id" },
  },
  [perentPerson]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Person, key: "id" },
  },
});

const Token = sequelize.define("Token", {
  value: { type: DataTypes.STRING },
  [perentUser]: {
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
})

const CustomerOrder = sequelize.define("CustomerOrder", {
  [perentProject]: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Project, key: "id" },
  },
  [perentCustomer]: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Customer, key: "id" },
  },
  display_order: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});
const Epic = sequelize.define("Epic", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  [perentCustomer]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Customer, key: "id" },
  },
});

const EpicOrder = sequelize.define("EpicOrder", {
  [perentCustomer]: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Customer, key: "id" },
  },
  [perentEpic]: {
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
  [perentEpic]: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Epic, key: "id" },
  },
});

const StoryOrder = sequelize.define("StoryOrder", {
  [perentEpic]: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Epic, key: "id" },
  },
  [perentStory]: {
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
});

const TaskOrder = sequelize.define("TaskOrder", {
  [perentStory]: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Story, key: "id" },
  },
  [perentTask]: {
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
  [perentUser]: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
        model: User,
        key: 'login'
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

//========== Person ==========
Person.hasOne(User, { foreignKey: perentPerson });

//========== Role ==========
Role.hasMany(User, { foreignKey: perentRole });

//========== User ==========
User.belongsTo(Person, { foreignKey: perentPerson });
User.belongsTo(Role, { foreignKey: perentRole });
User.hasOne(Token, { foreignKey: perentUser });
User.hasMany(Action, { foreignKey: perentUser });

//========== Token ==========
Token.belongsTo(User, { foreignKey: perentUser });

//========== Action ==========
Action.belongsTo(User, { foreignKey: perentUser });
Action.belongsTo(Project, { foreignKey: perentProject });
Action.belongsTo(Customer, { foreignKey: perentCustomer });
Action.belongsTo(Epic, { foreignKey: perentEpic });
Action.belongsTo(Story, { foreignKey: perentStory });
Action.belongsTo(Task, { foreignKey: perentTask });


//========== ProjectStatus ==========
ProjectStatus.hasMany(Project, { foreignKey: perentProjectStatus });

//========== Project ==========
Project.belongsTo(ProjectStatus, { foreignKey: perentProjectStatus });

Project.hasMany(Customer, { foreignKey: perentProject });
Project.hasMany(CustomerOrder, { foreignKey: perentProject });
Project.hasMany(Action, { foreignKey: perentProject });
//========== Customer ==========
Customer.belongsTo(Project, { foreignKey: perentProject });

Customer.hasOne(CustomerOrder, { foreignKey: perentCustomer });
Customer.hasMany(EpicOrder, { foreignKey: perentCustomer });
Customer.hasMany(Epic, { foreignKey: perentCustomer });
Customer.hasMany(Action, { foreignKey: perentCustomer });


//========== CustomerOrder ==========
CustomerOrder.belongsTo(Project, { foreignKey: perentProject });
CustomerOrder.belongsTo(Customer, { foreignKey: perentCustomer });

//========== Epic ==========
Epic.belongsTo(Customer, { foreignKey: perentCustomer });

Epic.hasOne(EpicOrder, { foreignKey: perentEpic });
Epic.hasMany(StoryOrder, { foreignKey: perentEpic });
Epic.hasMany(Story, { foreignKey: perentEpic });
Epic.hasMany(Action, { foreignKey: perentEpic });

//========== EpicOrder ==========
EpicOrder.belongsTo(Customer, { foreignKey: perentCustomer });
EpicOrder.belongsTo(Epic, { foreignKey: perentEpic });

//========== Story ==========
Story.belongsTo(Epic, { foreignKey: perentEpic });

Story.hasOne(StoryOrder, { foreignKey: perentStory });
Story.hasMany(TaskOrder, { foreignKey: perentStory });
Story.hasMany(Task, { foreignKey: perentStory });
Story.hasMany(Action, { foreignKey: perentStory });

//========== StoryOrder ==========
StoryOrder.belongsTo(Story, { foreignKey: perentStory });
StoryOrder.belongsTo(Epic, { foreignKey: perentEpic });


//========== UrgencyStatus ==========

//========== TaskStatus ==========
TaskStatus.hasMany(Task, { foreignKey: perentTaskStatus });


//========== Task ==========
Task.belongsTo(TaskStatus, { foreignKey: perentTaskStatus });
Task.belongsTo(UrgencyStatus, { foreignKey: perentUrgencyStatus });
Task.belongsTo(Story, { foreignKey: perentStory });

Task.hasOne(TaskOrder, { foreignKey: perentTask });
Task.hasMany(Action, { foreignKey: perentTask });

//========== TaskOrder ==========
TaskOrder.belongsTo(Task, { foreignKey: perentTask });
TaskOrder.belongsTo(Story, { foreignKey: perentStory });

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
  Customer
};
