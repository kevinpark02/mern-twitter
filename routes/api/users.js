const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/test", (req, res) => {
    res.json({ msg: "This is the user route" });
});

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({email: "A user has already registered"})
            } else {
                const newUser = new User({
                    handle: req.body.handle,
                    email: req.body.email,
                    password: req.body.password
                })
                newUser.save().then(user => res.send(user)).catch(err => res.send(err));
            }
        })
})

module.exports = router;

// You are setting up routes that can be used in app, instead of having to define every single route for all features into one code
