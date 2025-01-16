const { message } = require('../error/ApiError');

const router = require('express').Router();

router.use('/information/:projectId',(req, res, next) => {
    console.log(`[INDEX] Params:`, req.params);
    next()
});

router.get('/',(req,res) => {
    res.status(200).json({message: 'homepage'})
})

function initializeRoute(route, routeName) {
    const newRouter = require(`./${route}`);
    router.use(`/${routeName}`, newRouter);
}


initializeRoute('role', 'role');
initializeRoute('user', 'user');
initializeRoute('projectStatus', 'projectStatus');
initializeRoute('information', 'information');
initializeRoute('project', 'project');

module.exports = router;