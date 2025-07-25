const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resumeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    text: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
