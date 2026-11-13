const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

mongoose.connection.on('connected', () => {
  console.log('Connected to the Travlr database');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from the Travlr database');
});

function connect() {
  return mongoose.connect(dbURI, { serverSelectionTimeoutMS: 5000 });
}

module.exports = connect;