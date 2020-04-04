const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Transaction
let Transaction = new Schema({
  amount: {
    type: String
  },
  transactionType: {
    type: String
  },
  eTransferTo:{
    type: String
  },
  date: {
    type: String
  },
  balanceAfter:{
    type: String
  }
},{
    collection: 'transactions'
});

module.exports = mongoose.model('Transaction', Transaction);