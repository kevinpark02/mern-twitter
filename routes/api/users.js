const express = require("express");
const router = express.Router();
const User = require("../../models/User");
// Security
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

router.get("/test", (req, res) => {
    res.json({ msg: "This is the user route" });
});

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email,
    });
  }
);

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
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => { // you are taking the password string, and hashing it using salt... and then pass in the hashed password
                        if(err) throw err; // If there is an error, throw it
                        newUser.password = hash // If no error, then set the newUser's password to the hashed password
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
                // newUser.save().then(user => res.send(user)).catch(err => res.send(err)); --> we need to take this out because we are saving the user before we are not yet saving the password to hash using bcrypt
            }
        })
})

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "This user does not exist" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
          const payload = {
              id: user.id,
              handle: user.handle,
              email: user.email
          }

          jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600}, (err, token) => {
              res.json({
                  success: true,
                  token: "Bearer " + token
              });
          });
        // res.json({ msg: "Success" });
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

module.exports = router;

// You are setting up routes that can be used in app, instead of having to define every single route for all features into one code
