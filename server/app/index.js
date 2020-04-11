const express = require('express');
const path = require('path');
var cors = require('cors')
const logger = require('morgan');
const bodyParser = require('body-parser');
//const initializeAPIRoutes = require('./routes');
var passport = require('passport');


const app = express();


var initializeDB = require('./db');
initializeDB();

// maybe we need to require user schema in ./db
require('./config/passport');

const initializeAPIRoutes = require('./routes');

app.use(passport.initialize());



app.get('/*', function(req, res, next){ 
	res.setHeader('Last-Modified', (new Date()).toUTCString());
	next(); 
});

app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

initializeAPIRoutes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// catch unatu
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
//	res.render('error');
    res.send('error');
});

module.exports = app;