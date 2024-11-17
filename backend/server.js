const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
//setHeader very important!!!

//new way to separate routes in modules
const postRoutes = require("./routes/posts");
app.use(postRoutes);


app.listen(8080, () => console.log("Backend server started at port 8080. Write to express variable"));

