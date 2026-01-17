const mongoose = require("mongoose");

/*
 User Schema
 -----------
 This defines how a user will be stored in MongoDB
*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },
  },
  {
    timestamps: true,
  }
);

/*
 Export User model
*/
module.exports = mongoose.model("user", userSchema);
