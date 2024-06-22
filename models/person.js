const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Person schema
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
