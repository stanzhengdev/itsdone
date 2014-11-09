// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var listingSchema = mongoose.Schema({
  title: { type: String, required: true, unique: false },
  description: { type: String, required: true,  unique: false  },
  style: { type: String },
  modified: { type: Date, default: Date.now }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('listing', listingSchema);
