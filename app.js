const express = require("express");
const app = express();

// We want to app to make a get request & send the response
app.get("/", (req, res) => {
    res.send("Hello World!!");
});

// Setting up the port
const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)})