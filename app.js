const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const PORT = 3000;

// Configure Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve the existing Travlr website
const publicPath = path.join(__dirname, 'app_server', 'public');
app.use(express.static(publicPath));

// Keep the Travlr homepage working
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Express Generator routes
app.use('/express', indexRouter);
app.use('/users', usersRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Travlr Getaways running at http://localhost:${PORT}`);
});