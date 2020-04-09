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

/*We used every type as a string to simplify the data saving process

For transactionType and eTransferTo, these are strings by nature.
For date, it is easiest to use our customly formatted date of YYYY-MM-DD (this is easier than using Mongo's Date type)
For amount and balanceAfter, we chose to use Strings instead of Numbers for similar simplistic reasons - it is significantly
easier to format in JS and save to DB as our customly formatted String. It was simpler this way than researching how to set specified
decimal places in Mongo, instead we just save the formatted number as a string.

eTransferTo is an empty string if the transactionType !== "eTransfer"

*/

module.exports = mongoose.model('Transaction', Transaction);