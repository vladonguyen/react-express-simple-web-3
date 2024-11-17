const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

//setHeader very important!!!
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

//new way to separate routes in modules
const postRoutes = require("./routes/posts");
app.use(postRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

//new added error handling - important!

app.use((error,req,res,next)=>{
   const status = error.status || 500;
   const message = error.message || "Something went wrong.";
   res.status(status).json({message: message})
})


app.listen(8080, () => console.log("Backend server started at port 8080. Write to express variable"));

