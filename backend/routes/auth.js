const express = require("express");
const { hash } = require("bcryptjs");

const router = express.Router();

let users = [];

//Add new user
router.post("/register", async (req, res, next) => {
    try {
        if (req.body.password !== req.body.repassword) {
            const error = new Error();
            error.message = "Passwords don't match!"
            error.status = 400;
            throw error;
        };

        const isEmailUnique = users.findIndex((user) => user.email == req.body.email);
        if (isEmailUnique != "-1") {
            const error = new Error("User with this email is already registered");
            error.status = 409;
            throw error;
        }

        const bcryptPass = await hash(req.body.password, 12);

        const newUser = {
            email: req.body.email,
            password: bcryptPass
        }
        console.log("bcryptPass", bcryptPass);

        users.push(newUser);
        res.json("User added successfully!");
    } catch (error) {
        next(error);
    }

})

module.exports = router;