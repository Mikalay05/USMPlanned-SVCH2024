import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { Link } from 'react-router-dom';
import "./Header.css";
import { useSelector } from "react-redux";

const roles = {
  admin: 1,
  developer: 2,
  teamLead: 3,
};
const pathToProject = '/project';
const pathToTask = '/task';
const pathToUsers = '/user';
const rolesAccess = {
  Projects: [roles.admin, roles.developer, roles.teamLead],
  Users: [roles.admin],
  Tasks: [roles.developer],
};

export default function Header({ nameMainIcon = "MainIcon.svg", nameLoginIcon = "LoginIconFull.svg" }) {
  const { currentUser, isLoading } = useSelector((state) => state.user); // Получаем данные о пользователе и состояние загрузки

  // Функция проверки прав доступа
  const hasAccess = (roleArray) => roleArray.includes(currentUser.role?.id);

  if (isLoading) {
    return <div className="loading">Loading...</div>; // Замените на любой компонент загрузки
  }

  return (
    <header>
      <img src={`/${nameMainIcon}`} alt="Main Icon" />
      <BurgerMenu />
      <div className="links-in-header">
        {hasAccess(rolesAccess.Users) && <Link className="link-style-in-header" to={pathToUsers}>Users</Link>}
        {hasAccess(rolesAccess.Tasks) && <Link className="link-style-in-header" to={pathToTask}>Tasks</Link>}
        {hasAccess(rolesAccess.Projects) && <Link className="link-style-in-header" to={pathToProject}>Projects</Link>}
        <p>{currentUser.login}</p>
        <img src={`/${nameLoginIcon}`} alt="Login Icon" />
      </div>
    </header>
  );
}
