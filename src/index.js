const express = require("express");
const bodyParser =  require("body-parser")
const { PORT, DB_SYNC, FLIGHT_SERVICE_PATH } = require("./config/server-config");
const app = express();

const db = require("./models/index");

const apiRouter = require("./routes/index");

const startServer = () => {
    
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    
    app.use('/api', apiRouter);
    app.listen(PORT,() => {
        
        if(DB_SYNC) {
            db.sequelize.sync({alter: true});
        }
    //console.log(typeof FLIGHT_SERVICE_PATH)
        console.log("Server listening "+PORT);
    })
}

startServer();