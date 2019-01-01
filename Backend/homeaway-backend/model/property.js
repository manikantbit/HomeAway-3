const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

//Define Property Model
const propertySchema = new Schema({
  propid : { type: Number, default: 0, required:true },
  email: String,
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
  availFrom: Date,
  availTo:Date
});
propertySchema.plugin(autoIncrement.plugin, { model : 'Property' , field: 'propid' });

const Property = mongoose.model('Property',propertySchema);
module.exports= Property;