const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
// Routes
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
// Models
const User = require("./models/User");
// To set it up so that we can use POSTMan... tells our app what sorts of request it should respond to
const bodyParser = require("body-parser");
// Security
const passport = require('passport');

// We want mongoose to connect to the database created
mongoose
.connect(db, { useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));
  
  // Tell our app to use bodyParser... respond to json request & urlencoded (our app will respond to requests from other software)
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  
app.use(bodyParser.json());

// We want to app to make a get request & send the response (this also will be a test, that will get commented out)
// app.get("/", (req, res) => {
  // Below is for testing to see if we can create a user, using the User model
  // const user = new User({
    //     handle: "jim",
    //     email: "jim@gmail.com",
    //     password: "jimisgreat123"
    // })
    // user.save()
    // res.send("Hello World!!");
  // });
  
  // Passport
  app.use(passport.initialize());
  require('./config/passport')(passport);
  
  // To see the json response returned, in the url type in localhost:5000/api/users/test
  // Why put test at the end? Because in users.js (routes), we made a get request with "/test"
  // Which tacks on at the end of the address written below this comment.
  app.use("/api/users", users)
  app.use("/api/tweets", tweets)
  
  // Setting up the port
  const port = process.env.PORT || 5000;
  
  app.listen(port, () => {console.log(`Listening on port ${port}`)})
  
  const path = require('path');
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
  }