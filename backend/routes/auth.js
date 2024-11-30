const express = require("express");
const { hash, compare } = require("bcryptjs");

const { createJSONwebToken, validateJSONwebToken } = require("../utils/auth");

const router = express.Router();

let {users} = require("../data/readWriteVariables");

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
        console.log(users);
        res.json("User added successfully!");
    } catch (error) {
        next(error);
    }

});

//Login new user

router.post("/login", async (req, res, next) => {
    // console.log("req", req);
    try {
        const email = req.body.email;
        const password = req.body.password;
        const emailIndex = users.findIndex((user) => user.email == email);
        console.log(email, password, emailIndex);

        if (emailIndex == -1) {
            throw ({ message: "Email or username not matched or no such user!" });
        } else if (password) {
            const boolean = await compare(password, users[emailIndex].password);
            console.log("boolean", boolean)
            if (!boolean) {
                throw ({ message: "Email or username not matched or no such user!" });
            }
        }
        //need to add token return
        const token = await createJSONwebToken(email);
        console.log("Login successful!");
        console.log("token", token);
        res.json({email, token});
    } catch (error) {
        next(error);
    }

})

module.exports = router;