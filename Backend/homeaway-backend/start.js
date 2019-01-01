// Start our app!
const app = require('./app');

app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => {
  console.log(`GraphQL running → PORT ${server.address().port}`);
}); 