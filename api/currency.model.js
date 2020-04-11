const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Currency
let Currency = new Schema({
  name: {
    type: String
  },
  value: {
    type: Number
  },
  date:{
    type: String
  }
},{
    collection: 'currencies'
});

module.exports = mongoose.model('Currency', Currency);