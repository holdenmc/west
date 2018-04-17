const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
  name: {
    first: String,
    last: String
  },

  primaryEmail: {
    type: String,
    required: true
  },

  //Just plain text, not intended to be secure for now
  passcode: {
    type: String,
    required: true
  }
});

module.exports = PersonSchema;
