//NEW need to add express
const express = require('express');
const { v4: generateId } = require("uuid");

//CREATE STORE VARIABLE

let posts = [{ "id": 1, "title": "Example title", "desc": "Example desc." }];

//NEW important way to set router and replaces direct app.crud
const router = express.Router();

//GET ALL POSTS
router.get("/api/posts", (req, res, next) => {
    try {
        console.log("All posts get!")
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

//GET POST BY ID

router.get("/api/posts/:id", (req, res, next) => {
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

router.post("/api/create", (req, res, next) => {
    try {
        const newPost = {
            "id": generateId(),
            ...req.body
        }
        posts.push(newPost);

        console.log("New post created!");
        res.json(newPost).status(201);
    } catch (error) {
        next(error);
    }
});

//PATCH EDIT POST

router.patch("/api/posts/:id", (req, res, next) => {
    try {

        const postIndex = posts.findIndex((post) => post.id == req.params.id);
        console.log("Edit single post with id " + req.params.id)

        const editPost = {
            "id": req.params.id,
            ...req.body
        }
        posts[postIndex] = editPost;

        res.json(editPost).status(201);
    
    } catch (error) {
        next(error);
    }
});

//DELETE post (splice)

router.delete("/api/posts/:id/delete", (req, res, next) => {
    try {
        const postIndex = posts.findIndex((post) => post.id == req.params.id);
        console.log("Delete single post with id " + postIndex)
        res.json({ message: "Sucessful deletion" }).status(201);
        posts.splice(postIndex);
    } catch (error) {
        next(error);
    }
})

//important to export router
module.exports = router;