const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
    res.json({ msg: "This is the user route" });
});

module.exports = router;

// You are setting up routes that can be used in app, instead of having to define every single route for all features into one code
