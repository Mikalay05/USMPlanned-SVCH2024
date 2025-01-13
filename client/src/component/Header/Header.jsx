import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { Link } from 'react-router-dom';
import "./Header.css";
import { useSelector } from "react-redux";
import LoginIconMenu from "../LoginIconMenu/LoginIconMenu"; // Импортируем новый компонент
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // Функция проверки прав доступа
  const hasAccess = (roleArray) => roleArray.includes(currentUser.role?.id);

  // Обработчики событий для меню
  const handleEditProfile = () => {
    console.log("Редактировать данные пользователя");
    // Здесь можно добавить переход на страницу редактирования профиля
  };

  const handleLogout = () => {
    console.log("Выйти из системы");
  
    // Удаляем токен из localStorage
    localStorage.removeItem("token");
  
    // Удаляем cookie с именем refreshToken
    document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      navigate("/login");
  };
  

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
        <LoginIconMenu
          nameLoginIcon={nameLoginIcon}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
}
