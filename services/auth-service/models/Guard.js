const mongoose = require("mongoose");

const guardSchema = new mongoose.Schema({
  guardId: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  phone: String,
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Guard", guardSchema,"Guard");