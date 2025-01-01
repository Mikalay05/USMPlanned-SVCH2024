import ProjectPage from '../../page/ProjectPage/ProjectPage';
import ProjectInformation from '../../page/ProjectInformation/ProjectInformation';
import CustomerInformation from '../../page/CustomerInformation/CustomerInformation'
import Auth from '../../page/Auth/Auth';
import Reg from '../../page/Reg/Reg';
// import UserData from '../../page/UserData';
import Users from '../../page/Users/Users';



  
export const ROUTES = [
  {
    path: '/project',
    nameOfPage: 'Project',
    component: ProjectPage, 
  },
  {
    path: '/information/:projectId', 
    nameOfPage: 'ProjectInformation',
    component: ProjectInformation,
  },
  {
    path: '/information/:projectId/:customerId', 
    nameOfPage: 'ProjectInformation',
    component: CustomerInformation,
  },
  {
    path: '/auth', 
    nameOfPage: 'Auth',
    component: Auth,
  },
  {
    path: 'user/reg', 
    nameOfPage: 'Reg',
    component: Reg,
  },
  {
    path: '/user', 
    nameOfPage: 'user',
    component: Users,
  },
];