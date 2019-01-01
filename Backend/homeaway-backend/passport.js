var User = require('./model/user');
const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const localStrategy = require('passport-local').Strategy;
const JWTstrategy   = passportJWT.Strategy;

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, async (req,email, password,done) => {
      try {
        //Save the information provided by the user to the the database
        var {first_name,last_name,type} = req.body;
        const user = await User.create({ email, password, first_name,last_name,type });
        //Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        return done(error,null,"User already exists");
      }
  }));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, async (req,email, password, done) => {
    try {
      //Find the user associated with the email provided by the user
      var type = req.body.type;
      const user = await User.findOne({ email ,type });
      if( !user ){
        //If the user isn't found in the database, return a message
        return done(null, false, { message : 'User not found'});
      }
      //Validate password and make sure it matches with the corresponding hash stored in the database
      //If the passwords match, it returns a value of true.
      const validate = await user.isValidPassword(password);
      if( !validate ){
        return done(null, false, { message : 'Wrong Password'});
      }
      //Send the user information to the next middleware
      return done(null, user, { message : 'Logged in Successfully'});
    } catch (error) {
      return done(error);
    }
  }));

passport.use(new JWTstrategy({
    //secret we used to sign our JWT
    secretOrKey : 'homeaway',
    //we expect the user to send the token as a query paramater with the name 'secret_token'
    jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
  }, async (token, done) => {
    try {
      //Pass the user details to the next middleware
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));
