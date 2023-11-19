const mongoose = require("mongoose");
require("dotenv").config();

try {
  mongoose.set("strictQuery", false);

  mongoose.connect(process.env.DB);
} catch (error) {
  handleError(error);
}

const catSchema = new mongoose.Schema(
  {
    name: String,
    weight: String,
    height: String,
    type: String,
  },
  { timestamps: true },
  { collection: "cat" }
);

const catModel = mongoose.model("catModel", catSchema);
module.exports = catModel;
