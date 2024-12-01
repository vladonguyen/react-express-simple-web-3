//NEW need to add express
const express = require('express');
const { getAllPosts, getSinglePost, createNewPost, updatePost, deletePost } = require('../data/postActions');
const { checkAuth } = require('../utils/auth');
//CREATE STORE VARIABLE


//NEW important way to set router and replaces direct app.crud
const router = express.Router();

//GET ALL POSTS
router.get("/api/posts", (req, res, next) => {
    try {
        let posts = getAllPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

//GET POST BY ID

router.get("/api/posts/:id", (req, res, next) => {
    try {
        const singlePost = getSinglePost(req.params.id);
        res.json(singlePost);
    } catch (error) {
        next(error);
    }
});

//NEW add AUTH CHECK

router.use(checkAuth);

//POST CREATE

router.post("/api/create", (req, res, next) => {
    try {
        const newPost = createNewPost(req.body);
        res.json(newPost).status(201);
    } catch (error) {
        next(error);
    }
});

//PATCH EDIT POST

router.patch("/api/posts/:id", (req, res, next) => {
    try {
        const id = req.params.id;
        const newBody = req.body;
        const editPost = updatePost(id, newBody);

        res.json(editPost).status(201);

    } catch (error) {
        next(error);
    }
});

//DELETE post (splice)

router.delete("/api/posts/:id/delete", (req, res, next) => {
    try {
        deletePost(req.params.id);
        res.json({ message: "Sucessful deletion" }).status(201);
    } catch (error) {
        next(error);
    }
})

//important to export router
module.exports = router;