const personRouter = require('express').Router();
const personController = require('../controllers/PersonController');

personRouter.get("/", (req,res) => {
    res.status(200).json({message: 'personhome'})
})

module.exports = personRouter;