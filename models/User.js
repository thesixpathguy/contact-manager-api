const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "please add the contact name"],
    },
    email: {
      type: String,
      require: [true, "please add the email"],
      unique: [true, "only unique email addresses"],
      dropDups: true,
    },
    password: {
      type: String,
      require: [true, "please add the password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
