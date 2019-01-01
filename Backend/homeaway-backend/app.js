// Add dependencies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
//var index = require('./route/index');
const passport  = require('passport');
var userSchema = require('./graphql/types/schema');

const graphqlHTTP = require("express-graphql");

var app = express();


const mongoose = require('mongoose');

const options = {
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0,
  useNewUrlParser: true
};

//use cors to allow cross origin resource sharing
app.use(cors({ origin: '*', credentials: true }));
var mongoDB = 'mongodb://admin:cmpe273@ds131763.mlab.com:31763/cmpe273';

// Connect to our Database and handle any bad connections
mongoose.connect(mongoDB,options);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
require('./passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session); 


    
//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

  
app.use(session({
          name : 'homeaway',
          secret: "098878755854467997",
          resave: true,
          store:new MongoStore({ mongooseConnection: mongoose.connection }),
          saveUninitialized: true
}));
      
app.use('/graphql', graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
})); 
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  
  app.use(cookieParser());
  
  
  app.use(express.static(path.join(__dirname, 'public')));
  
  //app.use('/', index);
  //app.use('/user', passport.authenticate('jwt', {session: false}), user);
  //app.use('/auth', auth);
  
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('URL Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
  });
  
  module.exports = app;

