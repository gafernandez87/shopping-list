const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const shoppingListSchema = new Schema({
  name: String,
  status: String,
});

const shoppingListsModel = model('ShoppingList', shoppingListSchema);
module.exports = shoppingListsModel;
