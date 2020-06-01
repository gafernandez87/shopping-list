const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const roomSchema = new Schema({
  name: String,
  products: [{ name: String, inCart: Boolean }],
});

module.exports = model('Room', roomSchema);;
