const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for a transaction
// let Transaction = new Schema({
//   transactionType: {
//     type: String
//   },
//   moneyIn: {
//     type: Boolean
//   },
//   amount: {
//     type: Number
//   },
//   date: {
//     type: Date
//   } 
// });

// Define collection and schema for Account
let Account = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  balance:{
    type: Number
  }
},{
  collection: 'accounts'
});

module.exports = mongoose.model('Account', Account);


//   },
//   transactions: [Transaction]  
// ,{