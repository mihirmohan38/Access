const express = require('express') ; 
const bodyParser = require('body-parser'); 

// Express App
const app = express() ; 
const port = process.env.PORT || 4000 ; 

const testRouter = require("./test") ; 
const miscRouter = require("./scRouters/misc") ; 

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.use("/test", testRouter) ; 
app.use("/misc", miscRouter) ; 
// setting up the express server

app.listen(port, () => {
    console.log('API is online') ; 
}) ; 