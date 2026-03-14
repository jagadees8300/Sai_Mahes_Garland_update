const mongoose = require("mongoose");

const garlandSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});

module.exports = mongoose.model("Garland", garlandSchema);
