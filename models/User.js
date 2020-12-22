const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
// We are telling mongoose what it is to be user
// You need a handle, email, password, and then it will stamp the date it was created
