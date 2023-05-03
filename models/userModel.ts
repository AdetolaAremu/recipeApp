const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  middleName: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Email already exist"],
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  username: {
    type: String,
    unique: [true, "Username already exist"],
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function (this: any, el: String): boolean {
        return el === this.password;
      },
    },
  },
});
