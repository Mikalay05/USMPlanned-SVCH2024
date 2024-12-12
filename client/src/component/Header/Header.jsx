import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./Header.css"

//TODO get roles from DB
const roles = {
  admin: 0,
  developer: 1,
  teamLead: 2,
};
const rolesAccess = {
  Projects: [roles.admin, roles.developer, roles.teamLead],
  Users: [roles.admin],
  Tasks: [roles.developer],
};

export default function Header({ nameMainIcon = "MainIcon.svg", nameLoginIcon = "Login-Icon.svg" }) {
  //TODO get user

  const user = {
    login: "Login",
    role_id: 0,
  };

  const hasAccess = (roleArray) => roleArray.includes(user.role_id);

  return (
    <header>
      <img src={nameMainIcon} alt="Main Icon" />
      <BurgerMenu/>
      <div className="links-in-header">
        {hasAccess(rolesAccess.Users) && <p>Users</p>}
        {hasAccess(rolesAccess.Tasks) && <p>Tasks</p>}
        {hasAccess(rolesAccess.Projects) && <p>Projects</p>}
        <p>{user.login}</p>
        <img src={nameLoginIcon} alt="Login Icon" />
      </div>
    </header>
  );
}
