const apiRouter = require('./app_api/routes');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const connect = require('./app_api/models/db');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mvcRouter = require('./app_server/routes/index');

const app = express();
const PORT = 3000;

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

// Serve static Travlr assets
const publicPath = path.join(__dirname, 'app_server', 'public');
app.use('/api', apiRouter);
app.use('/', mvcRouter);

// Serve CSS, images, and other static assets
app.use(express.static(publicPath));

// Preserve existing Express Generator routes
app.use('/express', indexRouter);
app.use('/users', usersRouter);

// Start the server after MongoDB connects.
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Travlr Getaways running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Could not start Travlr:', error.message);
    process.exitCode = 1;
  });