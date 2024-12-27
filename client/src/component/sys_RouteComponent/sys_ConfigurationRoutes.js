import ProjectPage from '../../page/ProjectPage/ProjectPage';
import ProjectInformation from '../../page/ProjectInformation/ProjectInformation';
// import Auth from '../../page/Auth/Auth';
// import UserData from '../../page/UserData';
// import Users from '../../page/Users';



  
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
  ];
  