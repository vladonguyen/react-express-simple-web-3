const express = require("express");
const bodyParser = require("body-parser");
const {v4:generateId} = require("uuid");

const app = express();
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
//setHeader very important!!!

//CREATE STORE VARIABLE

//no posts
// let posts = [];

// default post
let posts = [{"id": 1, "title": "Example title", "desc": "Example desc."}];

//GET ALL POSTS
app.get("/api/posts", (req,res,next)=>{
    try {
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

//GET POST BY ID

app.get("/api/posts/:id", (req,res,next)=> {
    try {
        const postIndex = posts.findIndex((post) => post.id == req.params.id);
        console.log("Get single post with id " + postIndex)
        const singlePost = posts[postIndex];
        res.json(singlePost);
    } catch (error) {
        next(error);
    }
});

//POST CREATE

app.post("/api/create", (req, res, next)=> {
    try {
        const newPost = {
            "id": generateId(),
            ...req.body
        }
        posts.push(newPost);

        console.log(newPost);
        console.log("New post created!");
        res.json(newPost).status(201);
    } catch (error) {
        next(error);
    }
})




app.listen(8080, ()=> console.log("Backend server started at port 8080. Write to express variable"));

