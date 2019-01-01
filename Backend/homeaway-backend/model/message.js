const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

//Define Order Model
const msgSchema = new Schema({
  msgid : { type: Number, default: 0, required:true },
  sender: String,
  receiver: String,
  propertyID:Number,
  propertyName: String,
  message: {
    message: String,
    createdDate: Date
    },
  message1: {
    message: String,
    createdDate: Date
  } 
});
msgSchema.plugin(autoIncrement.plugin, { model : 'Message' , field: 'msgid' });

const Message = mongoose.model('Message',msgSchema);
 
module.exports = Message;