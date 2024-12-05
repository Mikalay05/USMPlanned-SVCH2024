const roleRouter = require('express').Router();
const roleController = require('../controllers/RoleController');

roleRouter.get("/", (req,res) => {
    res.status(200).json({message: 'rolehome'})
})

module.exports = roleRouter;