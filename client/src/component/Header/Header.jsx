import BurgerMenu from "../BurgerMenu/BurgerMenu";
import {Link} from 'react-router-dom'
import "./Header.css"
import { useSelector } from "react-redux";

const roles = {
  admin: 1,
  developer: 2,
  teamLead: 3,
};
const pathToProject = '/project'
const pathToTask = '/task';
const pathToUsers = '/user';
const rolesAccess = {
  Projects: [roles.admin, roles.developer, roles.teamLead],
  Users: [roles.admin],
  Tasks: [roles.developer],
};

export default function Header({ nameMainIcon = "MainIcon.svg", nameLoginIcon = "LoginIconFull.svg" }) {
  const user = useSelector((state) => state.user.currentUser);


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
