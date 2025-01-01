import BurgerMenu from "../BurgerMenu/BurgerMenu";
import {Link} from 'react-router-dom'
import "./Header.css"


//TODO get roles from DB
const roles = {
  admin: 0,
  developer: 1,
  teamLead: 2,
};
const pathToProject = '/project'
const pathToTask = '/task';
const pathToUsers = '/users';
const rolesAccess = {
  Projects: [roles.admin, roles.developer, roles.teamLead],
  Users: [roles.admin],
  Tasks: [roles.developer],
};

export default function Header({ nameMainIcon = "MainIcon.svg", nameLoginIcon = "LoginIconFull.svg" }) {
  //TODO get user

  const user = {
    login: "Login",
    role_id: 0,
  };

  const hasAccess = (roleArray) => roleArray.includes(user.role_id);

  return (
    <header>
      <img src={`/${nameMainIcon}`} alt="Main Icon" />
      <BurgerMenu/>
      <div className="links-in-header">
        {hasAccess(rolesAccess.Users) && <Link className="link-style-in-header" to={pathToUsers}>Users</Link>}
        {hasAccess(rolesAccess.Tasks) && <Link className="link-style-in-header" to={pathToTask}>Tasks</Link>}
        {hasAccess(rolesAccess.Projects) && <Link className="link-style-in-header" to={pathToProject}>Projects</Link>}
        <p>{user.login}</p>
        <img src={`/${nameLoginIcon}`}  alt="Login Icon" />
      </div>
    </header>
  );
}
