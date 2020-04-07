var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cassandra = require('cassandra-driver');

var indexRouter = require('./routes/index');
var queryRouter = require('./routes/query');
var homeRouter = require('./routes/home');
var searchsupplierRouter = require('./routes/searchsupplier');
var orderRouter = require('./routes/order');

var app = express();


var cassandra = require('cassandra-driver');
var contactPoints = ['cassandra.us-east-2.amazonaws.com:9142'];
var authProvider = new cassandra.auth.PlainTextAuthProvider('Sin-Rou_Chen-at-299196734494', 'bafkYpBEJ51qM/FOU+jrjBmNoX57l5W0hHwGOpzXTB8=')
var port = process.env.PORT || 8081;
var app = express();

var sslOptions = {
  cert: fs.readFileSync('AmazonRootCA1.pem'),
  host: 'cassandra.us-east-2.amazonaws.com',
  rejectUnauthorized: true
};

var client = new cassandra.Client({
  contactPoints: contactPoints, 
  authProvider: authProvider, 
  localDataCenter: 'us-east-2',
  sslOptions: sslOptions,});

async function connecttoDb() {
  var client = new cassandra.Client({
    contactPoints: contactPoints, 
    authProvider: authProvider, 
    localDataCenter: 'us-east-2',
    sslOptions: sslOptions,});
  await client.connect();
  console.log('Connected to MCS');
}

(async function start() {
  try {
    await connecttoDb();
    app.listen(port, () =>{
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/query', queryRouter);
app.use('/home', homeRouter);
app.use('/searchsupplier', searchsupplierRouter);
app.use('/order', orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
