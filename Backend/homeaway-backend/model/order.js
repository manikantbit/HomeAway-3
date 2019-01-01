const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

//Define Order Model
const orderSchema = new Schema({
  bookid : { type: Number, default: 0, required:true },
  email: String,
  propid:Number,
  location: String,
  proptype: String,
  headline: String,
  noOfRooms: String,
  noOfBath: String,
  allowedGuest: String,
  image1: String,
  image2: String,
  image3: String,
  image4: String,
  price: Number,
  amenities:String,
  first_name: String,
  last_name:String,
  phone:Number,
  bookedFrom: Date,
  bookedTo:Date,
  nights: Number,
});
orderSchema.plugin(autoIncrement.plugin, { model : 'Order' , field: 'bookid' });

const Order = mongoose.model('Order',orderSchema);
 
module.exports = Order;