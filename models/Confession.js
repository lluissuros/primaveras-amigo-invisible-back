const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ConfessionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  dateOfEntry: {
    type: Date,
    default: Date.now()
  }
});
module.exports = mongoose.model("confession", ConfessionSchema);
