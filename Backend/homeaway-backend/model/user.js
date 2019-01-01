const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
//const passportLocalMongoose = require('passport-local-mongoose');
var bcrypt=require('bcrypt');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

const userSchema = new Schema({

  id : { type: Number, default: 0, required:true },
  first_name: String,
  last_name: String,
  profile_image: String,
  about: String,
  phone: String,
  city: String,
  email: {type: String, unique:true,lowercase:true, required: true, index: true},
  password: String,
  type: String,
  company: String,
  school: String,
  hometown:String,
  languages: String,
  gender:String
});

userSchema.plugin(autoIncrement.plugin, { model : 'User' , field: 'id' });
//userSchema.plugin(passportLocalMongoose, {  usernameField : 'email' , hashField : 'password' });
userSchema.pre('save', async function(next){
  //'this' refers to the current document about to be saved
  const user = this;
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  const hash = await bcrypt.hash(this.password, 10);
  //Replace the plain text password with the hash and then store it
  this.password = hash;
  //Indicates we're done and moves on to the next middleware
  next();
});
mongoose.set('useCreateIndex', true);
//mongoose.set('useNewUrlParser', false);
mongoose.set('useFindAndModify', false);

userSchema.methods.isValidPassword = async function(password){
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the 
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

const User = mongoose.model('User',userSchema);

module.exports = User;