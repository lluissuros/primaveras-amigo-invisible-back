const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  confessionId: {
    type: String,
    required: true
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    min: -100,
    max: 100,
    default: null
  }
});
module.exports = mongoose.model("review", ReviewSchema);
