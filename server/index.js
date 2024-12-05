/*
*========== Env ==========
*/
require('dotenv').config();
const port = process.env.PORT || 5002;

/*
*========== DB ==========
*/
    
const sequelize = require('./db')
const models = require('./models/models')

/*
*========== Express ==========
*/
const express = require('express');
const app = express();

/*
*========== Middleware ==========
*/

const route = require('./routes/index')
app.use('/', route)

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();


        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        })
    }
    catch(err)
    {
        console.log("INDEX. Ошибка в Start: Error", err)
    }

}
start();