const express = require("express");
const bodyParser = require("body-parser");
const {v4:generateId} = require("uuid");

const app = express();
app.use(bodyParser.json());

app.listen(8080, ()=> console.log("Backend server started at port 8080. Write to express variable"));

