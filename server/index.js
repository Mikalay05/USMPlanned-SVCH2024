require('dotenv').config();
const port = process.env.PORT || 5002;

const sequelize = require('./db')
const express = require('express');
const models = require('./models/models')
const app = express();

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