export const API_ENDPOINTS = {
    PROJECT: {
        GET_PROJECTS: 'project/',
        CREATE_PROJECT: 'project/',
        GET_PROJECT_BY_ID: 'information/:projectId',
        DELETE_PROJECT: 'information/:projectId',
        UPDATE_PROJECT_DATA: 'information/:projectId',
        GET_PROJECT_ACTIONS_BY_ID: 'information/:projectId/actions',
    },
    CUSTOMER: {
        GET_CUSTOMER_ACTIONS_BY_ID: 'information/:projectId/:customerId/actions',
    },
    EPIC: {
        GET_EPIC_ACTIONS_BY_ID: 'information/:projectId/:customerId/:epic/actions',
    },
    STORY: {
        GET_STORY_ACTIONS_BY_ID: 'information/:projectId/:customerId/:epic/:storyId/actions',
    },
    TASK: {
        GET_TASK_ACTIONS_BY_ID: 'information/:projectId/:customerId/:epic/:storyId/:taskId/actions',
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