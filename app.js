const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Location of the Travlr Getaways website files
const publicPath = path.join(__dirname, 'app_server', 'public');

// Serve HTML, CSS, images, and other static files
app.use(express.static(publicPath));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Travlr Getaways running at http://localhost:${PORT}`);
});