// Module Dependencies .
// ==========================================================================================

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cm = require('./utility/common-module');
const app = express();

const index = require('./routes/index');
const accountSubjectRoute = require('./routes/accountSubject');
const accountingRoute = require('./routes/accounting');
const buildingRoute = require('./routes/building');
const itemRoute = require('./routes/item');
const marketingProgramRoute = require('./routes/marketingProgram');
const mealSetRoute = require('./routes/mealSet');
const memberRoute = require('./routes/member');
const saleRoute = require('./routes/sale');



// Middleware Setup .
// ==========================================================================================

// View Engine setup
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// API Routing . ( * Be Careful With The Order )
// ==========================================================================================
app.use('/', index);
app.use('/api/accoutSubject(s)?', accountSubjectRoute);
app.use('/api/accounting(s)?', accountingRoute);
app.use('/api/building(s)?', buildingRoute);
app.use('/api/item(s)?', itemRoute);
app.use('/api/marketingProgram(s)?', marketingProgramRoute);
app.use('/api/mealSet(s)?', mealSetRoute);
app.use('/api/member(s)?', memberRoute);
app.use('/api/sale(s)?', saleRoute);

// Catch 404 and forward to Error Handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  cm.logErr(`[ROUTES ${err.status}] URL : ${req.originalUrl} Not Found , Try Check Your Sever Routes`);
  res.status(err.status).send(`[ROUTES ${err.status}] URL : ${req.originalUrl} Not Found`);
});

// Error Handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send(err);

});


module.exports = app;
