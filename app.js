const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const createError = require('http-errors');

const mvcRouter = require('./app_server/routes/index');

const travelRouter = require('./app_server/routes/travel');

const app = express();

// Configure Handlebars for MVC
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(
  path.join(__dirname, 'app_server', 'views', 'partials')
);

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/travel', travelRouter);
app.use('/', mvcRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  res.locals.message = error.message;
  res.locals.error = app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.render('error', { title: 'Travlr Getaways' });
});

module.exports = app;
