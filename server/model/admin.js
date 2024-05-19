const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

adminSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      // _id: this.id,
      username: this.username
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

function validateAdmin(admin) {
  const schema = {
    username: Joi.string()
      .required()
      .error(errors => {
        return {
          message: "Username is required!"
        };
      }),
    password: Joi.string()
      .required()
      .error(errors => {
        return {
          message: "Password is required!"
        };
      })
  };
  return Joi.validate(admin, schema);
}

exports.Admin = Admin;
exports.validate = validateAdmin;
