import ProjectPage from '../../page/ProjectPage/ProjectPage';
import ProjectInformation from '../../page/ProjectInformation/ProjectInformation';
// import Auth from '../../page/Auth/Auth';
// import UserData from '../../page/UserData';
// import Users from '../../page/Users';


class RouteData {
    constructor(path, nameOfPage, elem) {
      this.path = path;
      this.nameOfPage = nameOfPage;
      this.elem = elem;
    }
  }
  
  export const ROUTES = [
    {
      path: '/project',
      nameOfPage: 'Project',
      component: ProjectPage,
    },
    {
      path: '/project/information',
      nameOfPage: 'ProjectInformation',
      component: ProjectInformation,
    },

    // new RouteData("/auth", "Auth", Auth),
    // new RouteData("/user-data", "UserData", UserData),
    // new RouteData("/users", "Users", Users),
  ];
  