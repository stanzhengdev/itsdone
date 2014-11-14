// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var listingSchema = mongoose.Schema({
  title: { type: String, required: true, unique: false },
  description: { type: String, required: true,  unique: false  },
  price: { type: Number },
  provider: { type: String },
  subscribers: {type: Array}, //, unique: true?
  closed: {type: Boolean, default: false},
  modified: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  tags: {type: Array},
  reviews: {type: Array}
});


// create the model for users and expose it to our app
module.exports = mongoose.model('listing', listingSchema);

/*
//reviewsschema

{
  date: { type: Date, default: Date.now },
  review: { type: String, required: true,  unique: false  },
  title: { type: String, required: true,  unique: false  },
  rating: { type: Number }

}
*/
