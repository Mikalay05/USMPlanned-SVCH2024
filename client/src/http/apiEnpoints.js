export const API_ENDPOINTS = {
    PROJECT: {
        GET_PROJECTS: 'project/',
        CREATE_PROJECT: 'project/',
        GET_PROJECT_DATA_BY_ID: 'information/:projectId/data',
        DELETE_PROJECT: 'information/:projectId',
        UPDATE_PROJECT_DATA: 'information/:projectId',
        GET_PROJECT_ACTIONS_BY_ID: 'information/:projectId/actions',
        GET_CHAIN_FOR_SELECT: 'information/:projectId/getChainForSelect',
    },
    CUSTOMER: {
        GET_CUSTOMER_ACTIONS_BY_ID: 'information/:projectId/:customerId/actions',
        GET_CUSTOMER_DATA_BY_ID: 'information/:projectId/:customerId/data',
        GET_CHAIN_FOR_SELECT: 'information/:projectId/:customerId/getChainForSelect',
        CREATE_CUSTOMER: 'information/:projectId',
    },
    EPIC: {
        GET_EPIC_ACTIONS_BY_ID: 'information/:projectId/:customerId/:epic/actions',
        GET_EPIC_DATA_BY_ID: 'information/:projectId/:customerId/:epic/data',
        GET_CHAIN_FOR_SELECT: 'information/:projectId/:customerId/:epic/getChainForSelect',
    },
    STORY: {
        GET_STORY_ACTIONS_BY_ID: 'information/:projectId/:customerId/:epic/:storyId/actions',
        GET_STORY_DATA_BY_ID: 'information/:projectId/:customerId/:epic/:storyId/data',
        GET_CHAIN_FOR_SELECT: 'information/:projectId/:customerId/:epic/:storyId/getChainForSelect',

    },
    TASK: {
        GET_TASK_ACTIONS_BY_ID: 'information/:projectId/:customerId/:epic/:storyId/:taskId/actions',
        GET_TASK_DATA_BY_ID: 'information/:projectId/:customerId/:epic/:storyId/:taskId/data',
        GET_CHAIN_FOR_SELECT: 'information/:projectId/:customerId/:epic/:storyId/:taskId/getChainForSelect',
    },
    PROJECT_STATUS: {
        GET_ALL_PROJECT_STATUSES: 'projectStatus/',
        GET_BY_ID_PROJECT_STATUS: 'projectStatus/',
    },
    ROLE: {
        GET_ALL_ROLES: '/role'
    },
    USER: {
        GET_ALL_USERS: '/user',
        REGISTRATION_USER:'/user/reg',
        LOGIN_USER:'/user/login',
        UPDATE_TOKEN: '/user/updateToken',
        GET_CURRENT_USER_DATA: '/user/currentUserData',
        PUT_UPDATE_USER_DATA: '/user/updateUser/:userId',
        PATCH_CHANGE_PASSWORD_USER: '/user/changePassword/:userId',
        GET_USER_DATA_BY_ID: '/user/data/:userId',
        UPDATE_USER_DATA_BY_ID: 'user/data/:userId'
    }
};