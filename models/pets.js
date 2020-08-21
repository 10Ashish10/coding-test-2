const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema 
({
  name: mongoose.Schema.Types.String,
  
  age: mongoose.Schema.Types.Number,
  
  color: mongoose.Schema.Types.String,
});

module.exports = mongoose.model('Users', UserSchema); // exported the schema 